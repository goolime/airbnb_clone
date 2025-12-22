import { FilterButton } from "../ExtndedFilter/FilterButton.jsx";
import { GuestFavorite, Luxe } from "../../components/util/Icons.jsx";

export function StandoutStaysSelector({ selectedStands, onChange }) {
    function handleChange(standout) {
        if (selectedStands.includes(standout)) {
            onChange(selectedStands.filter(s => s !== standout));
        } else {
            onChange([...selectedStands, standout]);
        }
    }
    function isActive(standout) {
        return selectedStands.includes(standout);
    }

    function StandoutButton({ standout, children }) {
        return <FilterButton className="sm:max-w-1/2 !rounded-3xl" isActive={isActive(standout)} onClick={() => handleChange(standout)}>
            <div className="flex items-center gap-2 p-1">
                {children}
            </div>
        </FilterButton>
    }

    return <>
        <div className="flex max-sm:flex-col gap-2 flex-space-around text-gray-800" >
            <StandoutButton standout="Guest favorite" >
                <div className="flex items-center gap-2 p-1">
                    <GuestFavorite className="!size-[2rem]" />
                    <div className="flex flex-col items-start">
                        <div className="font-semibold ">Guest favorite</div>
                        <div className="text-balance text-left text-gray-500">The most loved homes on Airdnd</div>
                    </div>
                </div>
            </StandoutButton>
            <StandoutButton standout="Amazing views" >
                <div className="flex items-center gap-2 p-1">
                    <Luxe className="!size-[2rem]" />
                    <div className="flex flex-col items-start">
                        <div className="font-semibold">Luxe</div>
                        <div className="text-wrap text-left text-gray-500">Luxury homes with elevated design</div>
                    </div>
                </div>
            </StandoutButton>
        </div>
    </>
}