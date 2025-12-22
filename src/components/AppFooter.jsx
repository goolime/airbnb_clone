import { FcCheckmark } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

export function AppFooter() {

    return <>

        <footer className="flex bg-(--headerBg) px-10 border-t border-gray-200">
            <div className="py-6 text-sm text-[#222222] mx-10">
                <div className="flex flex-wrap items-center gap-2">
                    <span>© 2025 Airdnd, Inc.</span>

                    <span>·</span>
                    <a href="#" className="hover:underline">Terms</a>

                    <span>·</span>
                    <a href="#" className="hover:underline">Sitemap</a>

                    <span>·</span>
                    <a href="#" className="hover:underline">Privacy</a>

                    <span>·</span>
                    <div className="flex items-center gap-2 text-[#6c6c6c]">
                        <span>Your Privacy Choices</span>
                        <button
                            className="flex items-center justify-between w-8 h-4 px-[2px]
                   border border-[#0066FF] rounded-full"
                            aria-label="Privacy choices enabled"
                        >
                            <FcCheckmark size={10} className="text-[#0066FF]"/>
                            <span className="flex items-center justify-center w-3 h-3 bg-[#0066FF] rounded-full">
                                <IoClose size={8} className="text-white" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    </>
}