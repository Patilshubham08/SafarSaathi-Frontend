import React, { useState, useEffect } from 'react';
import { Plane, Hotel, Home, Train, Bus, Car, Palmtree, CreditCard, ChevronDown, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const HomeSearch = () => {
    const [activeTab, setActiveTab] = useState('Flights');
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const tabs = [
        { name: 'Flights', icon: <Plane size={24} />, label: "Book Flights" },
        { name: 'Hotels', icon: <Hotel size={24} />, label: "Book Hotels" },
        { name: 'Homestays', icon: <Home size={24} />, label: "Book Homestays" },
        { name: 'Holiday Packages', icon: <Palmtree size={24} />, label: "Holiday Packages" },
        { name: 'Trains', icon: <Train size={24} />, label: "Book Trains" },
        { name: 'Buses', icon: <Bus size={24} />, label: "Book Buses" },
        { name: 'Cabs', icon: <Car size={24} />, label: "Book Cabs" },
        { name: 'Forex', icon: <CreditCard size={24} />, label: "Forex Card & Currency" },
        { name: 'Charter Flights', icon: <Plane size={24} />, label: "Book Charter Flights" },
    ];

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (query.length > 1) {
                fetchResults();
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const fetchResults = async () => {
        try {
            setIsSearching(true);
            const response = await api.get(`/packages/search?query=${query}`);
            setResults(response.data);
            setShowDropdown(true);
        } catch (error) {
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectPackage = (pkg) => {
        navigate(`/packages/${pkg.packageId}`);
        setShowDropdown(false);
    };

    const renderSearchFields = () => {
        switch (activeTab) {
            case 'Flights':
            case 'Charter Flights':
            case 'Holiday Packages':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 box-border border rounded-xl overflow-visible shadow-sm relative z-50">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">From</span>
                            <span className="text-2xl font-black text-gray-800 block">Delhi</span>
                            <span className="text-xs text-gray-500 truncate block w-full">DEL, Delhi Airport India</span>
                        </div>

                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all md:col-span-2">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">To</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setShowDropdown(true);
                                }}
                                placeholder="Search Destination..."
                                className="text-2xl font-black text-gray-800 block w-full bg-transparent border-none outline-none placeholder-gray-300"
                            />
                            <span className="text-xs text-gray-500 truncate block w-full">
                                {query ? "Searching for " + query : "Search for places, hotels..."}
                            </span>

                            {showDropdown && results.length > 0 && (
                                <div className="absolute top-full left-0 w-[400px] bg-white shadow-2xl rounded-xl mt-2 border border-gray-100 overflow-hidden z-[100] max-h-[400px] overflow-y-auto">
                                    <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Top Packages
                                    </div>
                                    {results.map((pkg) => (
                                        <div
                                            key={pkg.packageId}
                                            onClick={() => handleSelectPackage(pkg)}
                                            className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0 transition-colors"
                                        >
                                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={pkg.imageUrl} alt={pkg.packageName} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800 text-sm leading-tight">{pkg.packageName}</h4>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                                    <MapPin size={10} />
                                                    <span className="truncate">{pkg.description?.substring(0, 30)}...</span>
                                                </div>
                                                <div className="text-blue-600 font-black text-sm mt-1">₹{pkg.price?.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showDropdown && query.length > 1 && results.length === 0 && !isSearching && (
                                <div className="absolute top-full left-0 w-[400px] bg-white shadow-2xl rounded-xl mt-2 border border-gray-100 p-4 z-[100] text-center text-gray-500 text-sm">
                                    No packages found for "{query}"
                                </div>
                            )}
                        </div>

                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Departure</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">24 <span className="text-lg">Sep'24</span></span>
                            <span className="text-xs text-gray-500 block">Tuesday</span>
                        </div>
                        <div className="p-4 hover:bg-blue-50 cursor-pointer relative group transition-all">
                            <span className="text-xs text-gray-500 font-bold uppercase block mb-1">Travellers & Class</span>
                            <span className="text-2xl font-black text-gray-800 block flex items-baseline gap-1">1 <span className="text-lg">Traveller</span></span>
                            <span className="text-xs text-gray-500 block">Economy</span>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 box-border border rounded-xl overflow-hidden shadow-sm">
                        <div className="p-4 hover:bg-blue-50 cursor-pointer border-r relative group transition-all md:col-span-4">
                            <div className="flex items-center justify-center p-8 text-gray-400">
                                <span className="text-lg">Select 'Flights' or 'Holiday Packages' to search</span>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
            <div className="bg-white rounded-xl shadow-2xl overflow-visible">
                <div className="flex justify-between items-center px-4 py-2 border-b bg-white overflow-x-auto scrollbar-hide rounded-t-xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex flex-col items-center gap-1 px-4 py-3 min-w-[80px] transition-all relative group
                                ${activeTab === tab.name ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
                        >
                            <span className={`transform transition-transform duration-200 group-hover:scale-110 ${activeTab === tab.name ? 'text-blue-600' : 'text-gray-400'}`}>
                                {tab.icon}
                            </span>
                            <span className={`text-[10px] font-bold whitespace-nowrap uppercase tracking-wider mt-1 ${activeTab === tab.name ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                                {tab.name}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="p-8 pb-12 relative z-10">
                    <div className="mb-8 relative z-20">
                        {renderSearchFields()}
                    </div>

                    <div className="flex flex-wrap justify-between items-center gap-6">
                        <div className="flex gap-4">
                            {(activeTab === 'Flights' || activeTab === 'Charter Flights') && (
                                <>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="trip" id="one-way" defaultChecked className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <label htmlFor="one-way" className="text-xs font-bold text-gray-700 cursor-pointer uppercase">One Way</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="radio" name="trip" id="round-trip" className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        <label htmlFor="round-trip" className="text-xs font-bold text-gray-700 cursor-pointer uppercase">Round Trip</label>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
                            <button
                                onClick={() => navigate('/packages')}
                                className="bg-gradient-to-r from-[#008cff] to-[#005eff] text-white px-16 py-3 rounded-full font-black text-2xl shadow-xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest border-4 border-white"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSearch;
