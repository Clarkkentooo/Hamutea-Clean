import ChineFlatLogo from "@assets/svg/chinese-flat-logo.svg";
import Profile from "@assets/svg/profile.svg";


const Account = () => {
    return (
        <div className="bg-white h-screen overflow-hidden relative flex items-center justify-center p-10">
            <div className="absolute top-0 left-0 w-full bg-[#FFEEC3] h-[22.6875rem]  overflow-hidden z-0">
                <div className="absolute top-0 right-0 z-0">
                    <img src={ChineFlatLogo} alt="" />
                </div>
            </div>

            <div className="w-full bg-white max-w-xl mt-24  z-10 rounded-2xl relative border border-hamutea-border p-10">
                <div className="absolute -top-10 transform -translate-x-1/2 left-1/2 z-0">
                    <img src={Profile} alt="" className="h-28 w-h-28 rounded-full" />
                </div>

                <div className="flex justify-end w-full">
                    <button className="rounded-full bg-[#fafafa] px-5 py-2 border-2 border-hamutea-border">
                        Edit Info
                    </button>
                </div>

                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-2xl font-bold">Tobio Kageyama</h1>
                    <p>kageyamaster18@adamson.edu.ph</p>
                </div>

                <div className="flex flex-col gap-5 mt-10">
                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="full_name" className="text-hamutea-gray">Full Name</label>
                        <input type="text" id="full_name" className="ml-5 flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" />
                    </div>

                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="phone_number" className="text-hamutea-gray">Phone Number</label>
                        <input type="text" id="phone_number" className="ml-5 flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" />
                    </div>

                    <div className="flex border-b border-hamutea-border pb-2">
                        <label htmlFor="birth_date" className="text-hamutea-gray">Birth Date</label>
                        <input type="text" id="birth_date" className="ml-5 flex-1 appearance-none border-none outline-none bg-transparent m-0 shadow-none focus:outline-none" />
                    </div>

               
                </div>



                <div className="flex justify-center w-full mt-10">
                    <button className="rounded-full bg-[#fadcdc] px-5 py-2 border-2 border-hamutea-red text-hamutea-red">
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Account;