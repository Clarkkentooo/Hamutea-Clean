import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactUs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className="relative w-full flex flex-col justify-center items-center pt-20 mt-14 min-h-screen">
            {/* Paragraph Positioned Absolutely */}
            <div className="z-10 max-w-[60rem] mt-32 px-10">
                <h1 className="mt-7 text-[3rem] md:text-[5rem] w-full max-w-screen-sm mx-auto leading-normal font-semibold text-center bg-gradient-to-r from-[#E44040] to-[#FF7A31] bg-clip-text text-transparent break-words z-10 font-sf-pro-rounded">
                    General Enquiries
                </h1>
                <p className="font-sans font-medium text-[1rem] leading-snug text-center text-[#462525]">
                    Got questions, feedback, or just want to share your love for Milk tea with us?
                    We'd love to hear from you! For any general information or enquiries about Hamutea,
                    get in touch, and we'll get back to you as soon as we can.
                </p>

                <div className="flex items-center justify-center mt-5">
                    <button
                        className="px-10 bg-[#E44040] hover:bg-[#FF7A31] text-white text-[3vw] sm:text-sm md:text-base font-semibold transition-colors duration-300"
                        style={{ borderRadius: '30.1834px' }}
                    >
                        Contact Us
                    </button>
                </div>
            </div>

            <div className="w-full mt-10 border-t border-gray-200"></div>

            <h1 className="my-10 w-full max-w-screen-sm mx-auto text-[6vw] sm:text-[5vw] md:text-[65px] leading-none font-semibold text-center text-[#D91517] whitespace-nowrap z-10 font-sf-pro-rounded">
                Collaboration process
            </h1>

            <div className="relative p-10">
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Collaboration Process Image</p>
                </div>
            </div>

            <div className="h-screen w-full relative">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-10">
                    <div className="border w-full max-w-xl p-5 rounded-2xl border-hamutea-border bg-white">
                        <h1 className="text-2xl font-bold">Franchise Application</h1>
                        <form className="flex flex-col gap-5 mt-3">
                            <div className="relative mb-4">
                                <input
                                    id="name"
                                    type="text"
                                    className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                                    required
                                    placeholder=" "
                                    aria-required="true"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
                                >
                                    Name
                                </label>
                            </div>

                            <div className="relative mb-4">
                                <input
                                    id="email"
                                    type="text"
                                    className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                                    required
                                    placeholder=" "
                                    aria-required="true"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
                                >
                                    Email / Phone no:
                                </label>
                            </div>

                            <div className="relative mb-4 flex md:items-center md:flex-row flex-col justify-between px-2 gap-2">
                                <p className="text-gray-400">Type of Franchise Application</p>
                                <div className="flex items-center gap-2">
                                    <button type="button" className="px-3 py-2 border text-gray-400 rounded-full">Multi-Store</button>
                                    <button type="button" className="px-3 py-2 border text-gray-400 rounded-full">Single Store</button>
                                </div>
                            </div>

                            <div className="relative mb-4">
                                <input
                                    id="investment_budget"
                                    type="text"
                                    className="peer w-full px-3 pt-4 pb-2 border-b border-gray-300 bg-transparent text-black focus:outline-none focus:ring-0 focus:border-[#D91517] transition"
                                    required
                                    placeholder=" "
                                    aria-required="true"
                                />
                                <label
                                    htmlFor="investment_budget"
                                    className="absolute left-3 top-1 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-[#D91517] peer-focus:text-sm"
                                >
                                    Investment Budget
                                </label>
                            </div>

                            <div className="relative mb-4 flex md:items-center md:flex-row flex-col justify-between px-2 gap-2">
                                <p className="text-gray-400">Investment Areas</p>
                                <div className="flex items-center gap-2">
                                    <select
                                        className="px-3 py-2 border text-gray-400 rounded-full appearance-none bg-transparent focus:outline-none"
                                    >
                                        <option value="" disabled selected hidden>Please Select</option>
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                    </select>
                                    <select
                                        className="px-3 py-2 border text-gray-400 rounded-full appearance-none bg-transparent focus:outline-none"
                                    >
                                        <option value="" disabled selected hidden>Please Select</option>
                                        <option value="optionA">Option A</option>
                                        <option value="optionB">Option B</option>
                                    </select>
                                </div>
                            </div>

                            <button className="bg-hamutea-red text-white py-2 rounded-full">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[50rem] mb-10 px-10">
                <h1 className="text-2xl font-bold mb-3">Frequently Asked Questions</h1>

                {[...Array(10)].map((_, index) => (
                    <div key={index}>
                        <div
                            onClick={() => handleToggle(index)}
                            className="bg-hamutea-red rounded-full px-3 py-2 text-white mb-2 relative cursor-pointer"
                        >
                            <p>{index + 1}. How long is the contract valid for? What happens when it expires?</p>
                            <div className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`w-6 h-6 shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    key="faq-content"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-white rounded-2xl p-5 border border-hamutea-border mb-3">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, voluptatem! Quia
                                            aliquid tempora aut iste nihil illo molestias quam earum sit, aspernatur soluta
                                            accusantium? Distinctio sit animi inventore voluptatem explicabo.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactUs;