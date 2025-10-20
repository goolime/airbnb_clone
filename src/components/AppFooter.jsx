export function AppFooter() {

    return <>

        <footer className="flex flex-col bg-(--headerBg) ">
            <div className="grid grid-cols-wrap sm:grid-cols-[5px_repeat(6,1fr)_5px] lg:grid-cols-[5px_repeat(12,1fr)_5px] gap-8 px-10 sm:px-0 sm:border-b sm:border-gray-200 py-12">
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
            </div>
            <div className="py-6 mx-10">
                <div>
                    <span>© 2025 Airdnd, Inc. · Terms · Sitemap · Privacy · Your Privacy Choices</span>
                </div>
            </div>
        </footer>
    </>
}