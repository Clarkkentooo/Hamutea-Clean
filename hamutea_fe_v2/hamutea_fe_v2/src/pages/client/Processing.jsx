import LoadingBear from '/src/assets/menu_assets/loading_bear.svg';
import { useLocation } from 'react-router-dom';

const ProcessingPage = () => {
    const location = useLocation();
    const estimatedTime = location.state?.customTime || '1:10';

    return (
        <>
            <div className="relative w-full min-h-screen bg-[#FDF8F8] font-[SF Pro Rounded] overflow-x-hidden flex flex-col px-4 pt-[120px]">
                <div className="flex-grow flex flex-col items-center justify-center">
                    {/* Loading Bear SVG */}
                    <img
                        src={LoadingBear}
                        alt="Loading Bear"
                        className="w-[160px] sm:w-[192.8px] h-auto mb-10 animate-bounce"
                    />

                    {/* Processing Message */}
                    <h1 className="text-[32px] sm:text-[40px] font-semibold text-[#462525] text-center">
                        Processing Order...
                    </h1>

                    <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-[#462525]/85 font-[Inter] text-center">
                        We are still preparing your order
                    </p>

                    {/* Progress bar (3 dots + lines) */}
                    <div className="relative mt-12 w-[90%] max-w-[607px] h-[58px] flex items-center justify-between">
                        <div className="w-[58px] h-[58px] bg-[#D91517] border-4 border-[#D91517] rounded-full animate-pulse" />
                        <div className="flex-1 h-1 border-t-4 border-[#D91517] mx-2 animate-pulse" />
                        <div className="w-[58px] h-[58px] border-4 border-[#D91517] opacity-25 rounded-full animate-pulse" />
                        <div className="flex-1 h-1 border-t-4 border-[#D91517] opacity-25 mx-2 animate-pulse" />
                        <div className="w-[58px] h-[58px] border-4 border-[#D91517] opacity-25 rounded-full animate-pulse" />
                    </div>

                    <p className="mt-14 text-[18px] sm:text-[20px] text-[#462525]/45 font-medium font-[Inter] text-center">
                        Estimated time of Pick-up: {estimatedTime}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ProcessingPage;