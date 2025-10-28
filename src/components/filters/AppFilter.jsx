import { useEffect, useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import { propertiesService } from "../../services/properties.service.js"

import { LargeFilter } from "../filters/LargeFilter.jsx";
import { MobileFilter } from "../filters/MobileFilter.jsx";
import { CompactFilter } from "./CompactFilter.jsx";


export function AppFilter() {
    const [filterData, setFilterData] = useState(propertiesService.getDefaultFilter());

    const [totalCapacity, setTotalCapacity] = useState(null)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLargeFilterVisible, setIsLargeFilterVisible] = useState(true);
    
    // Track which modal should open
    const [pendingModalType, setPendingModalType] = useState(null);

    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // Open the pending modal when large filter becomes visible
        if (isLargeFilterVisible && pendingModalType) {
            const timer = setTimeout(() => {
                if (pendingModalType === 'location') {
                    onOpenLocationModal();
                } else if (pendingModalType === 'date') {
                    onOpenDateModal();
                } else if (pendingModalType === 'guest') {
                    onOpenGuestModal();
                }
                setPendingModalType(null);
            }, 400);
            
            return () => clearTimeout(timer);
        }
    }, [isLargeFilterVisible, pendingModalType]);

    function handleScroll() {
        const position = window.pageYOffset;
        setScrollPosition(position);
        
        if (position > 5) {
            setIsLargeFilterVisible(false);
        }
    }

    function handleLargeFilterVisibility(isVisible) {
        console.log('Setting large filter visibility to:', isVisible);
        setIsLargeFilterVisible(isVisible);
    }

    function handleFilterPropertyChange(field, value) {
        setFilterData((prevData) => ({
            ...prevData,
            [field]: value,
        }))
    }

    function navigateToSearch() {
        navigate({ pathname: '/search', search: `?${propertiesService.getSearchParamsFromFilter(filterData).toString()}` });
    }

    function navigateToExplore() {
        navigate({ pathname: '/', search: `?${propertiesService.getSearchParamsFromFilter(filterData).toString()}` });
    }

    function onOpenFilterModal() {
        setIsFilterModalOpen(true)
    }

    function onCloseFilterModal() {
        setIsFilterModalClose(false)
    }

    function onOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    // Modal trigger functions for CompactFilter
    function onOpenLocationModal() {
        setPendingModalType('location');
    }

    function onOpenDateModal() {
        setPendingModalType('date');
    }

    function onOpenGuestModal() {
        setPendingModalType('guest');
    }

    // Determine which filter to show based on scroll AND manual visibility toggle
    const showLargeFilter = scrollPosition <= 5 || isLargeFilterVisible;

    return (
        <>
            {/* Desktop Filters */}
            <div className="hidden sm:block relative">
                <div className="relative w-full flex items-center justify-center">
                    <div className={`
                        absolute
                        w-fit
                        transition-all 
                        duration-400
                        ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${showLargeFilter
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 -translate-y-1 pointer-events-none'
                        }
                    `}>
                        <LargeFilter
                            filterData={filterData}
                            handleFilterPropertyChange={handleFilterPropertyChange}
                            onOpenModal={onOpenModal}
                            onCloseModal={onCloseModal}
                            isModalOpen={isModalOpen}
                            navigateToSearch={navigateToSearch}
                            pendingModalType={pendingModalType}
                        />
                    </div>

                    <div className={`
                        absolute
                        inset-x-0
                        transition-all
                        duration-400
                        ease-[cubic-bezier(0.4,0,0.2,1)]
                        ${!showLargeFilter
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-1 pointer-events-none'
                        }
                    `}>
                        <CompactFilter 
                            currentPath={currentPath} 
                            handleLargeFilterVisibility={handleLargeFilterVisibility}
                            onOpenLocationModal={onOpenLocationModal}
                            onOpenDateModal={onOpenDateModal}
                            onOpenGuestModal={onOpenGuestModal}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Filter */}
            <div className="sm:hidden w-full">
                <MobileFilter
                    handleFilterPropertyChange={handleFilterPropertyChange}
                    navigateToSearch={navigateToSearch}
                    navigateToExplore={navigateToExplore}
                    isFilterModalOpen={isFilterModalOpen}
                    onCloseFilterModal={onCloseFilterModal}
                    isModalOpen={isModalOpen}
                    onCloseModal={onCloseModal}
                    onOpenFilterModal={onOpenFilterModal}
                    currentPath={currentPath}
                    filterData={filterData}
                />
            </div>
        </>
    )
}