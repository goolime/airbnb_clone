import { ChevronLeft, ChevronRight } from "../util/Icons.jsx"

export function Paging({page, maxPage, onPageInc, onPageDec, onPageSelect}) {


    //console.log('Paging component - page:', page, 'maxPage:', maxPage);

    return <>
        <div className="flex items-center justify-center space-x-2 mt-4 text-gray-700">
            <PageOption number={<ChevronLeft className="size-[1rem]" />} isActive={page > 1} isSelected={false} onClick={onPageDec} />
            {1 <= page-3 && <>
                <PageOption number={"1"} isActive={true} isSelected={false} onClick={() => onPageSelect(1)} />
                {page - 3 > 1 && <span className="mx-0.7 text-gray-800">...</span>}
            </>}
            {page-2 > 0 && <PageOption number={page-2} isActive={page-2 > 0} isSelected={false} onClick={() => onPageSelect(page-2)} />}
            {page-1 > 0 && <PageOption number={page-1} isActive={page-1 > 0} isSelected={false} onClick={() => onPageSelect(page-1)} />}
            <PageOption number={page} isActive={false} isSelected={true} onClick={() => {}} />
            {page+1 <= maxPage && <PageOption number={page+1} isActive={page+1 <= maxPage} isSelected={false} onClick={() => onPageSelect(page+1)} />}
            {page+2 <= maxPage && <PageOption number={page+2} isActive={page+2 <= maxPage} isSelected={false} onClick={() => onPageSelect(page+2)} />}
            {page+3 <= maxPage && <>
                {page+3 < maxPage && <span className="mx-0.7 text-gray-800">...</span>}
                <PageOption number={maxPage} isActive={true} isSelected={false} onClick={() => onPageSelect(maxPage)} />
            </>}
            <PageOption number={<ChevronRight className="size-[1rem]" />} isActive={page < maxPage} isSelected={false} onClick={onPageInc} />
        </div>
    </>
}

function PageOption({number, isActive,isSelected, onClick}) {
    return <div className={`${isActive ? "hover:bg-gray-300 hover:font-bold text-gray-800 font-semibold cursor-pointer" :'cursor-not-allowed' } ${isSelected ? 'bg-gray-800 text-white hover:bg-gray-800 font-bold  hover:font-bold !cursor-default' : ''} ${!isActive && !isSelected ? 'opacity-50' : '' }  rounded-full size-[2rem] flex items-center justify-center` } onClick={isActive ? onClick : undefined}>
        {number}
    </div>
}