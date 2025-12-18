import { FcCheckmark } from "react-icons/fc";
import { IoClose } from "react-icons/io5";

export function AppFooter() {

    return <>

        <footer className="flex bg-(--headerBg) px-10 border-t border-gray-200">
            {/* <div className="grid grid-cols-wrap sm:grid-cols-[5px_repeat(6,1fr)_5px] lg:grid-cols-[5px_repeat(12,1fr)_5px] gap-8 px-10 sm:px-0 sm:border-b sm:border-gray-200 py-12">
                <div className="flex flex-col sm:col-[2/4] lg:col-[2/4] sm:py-0 sm:border-0 border-b-1 border-gray-200 py-6">
                    <span className="font-semibold mb-4">Support</span>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Get help with a safety issue</a></li>
                        <li><a href="#">AirCover</a></li>
                        <li><a href="#">Anti-discrimination</a></li>
                        <li><a href="#">Disability support</a></li>
                        <li><a href="#">Cancellation options</a></li>
                        <li><a href="#">Report neighborhood concern</a></li>
                    </ul>
                </div>
                <div className="flex flex-col sm:col-[4/6] lg:col-[6/8] sm:py-0 sm:border-0 border-b-1 border-gray-200 py-6">
                    <span className="font-semibold mb-4">Hosting</span>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#">Airbnb your home</a></li>
                        <li><a href="#">Airbnb your experience</a></li>
                        <li><a href="#">Airbnb your service</a></li>
                        <li><a href="#">AirCover for Hosts</a></li>
                        <li><a href="#">Hosting resources</a></li>
                        <li><a href="#">Community forum</a></li>
                        <li><a href="#">Hosting responsibly</a></li>
                        <li><a href="#">Airbnb-friendly apartments</a></li>
                        <li><a href="#">Join a free Hosting class</a></li>
                        <li><a href="#">Find a co‑host</a></li>
                    </ul>
                </div>
                <div className="flex flex-col sm:col-[6/8] lg:col-[10/12] sm:py-0 sm:border-0 border-b-1 border-gray-200 py-6">
                    <span className="font-semibold mb-4">Airbnb</span>
                    <ul className="flex flex-col gap-3">
                        <li><a href="#">2025 Summer Release</a></li>
                        <li><a href="#">Newsroom</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Investors</a></li>
                        <li><a href="#">Gift cards</a></li>
                        <li><a href="#">Airbnb.org emergency stays</a></li>
                    </ul>
                </div>
            </div> */}
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