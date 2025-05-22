import { useState, useEffect } from "react";

const ToggleButton = ({ isActive: propIsActive, onClick }) => {
    const [isActive, setIsActive] = useState(propIsActive || false);
    
    useEffect(() => {
        if (propIsActive !== undefined) {
            setIsActive(propIsActive);
        }
    }, [propIsActive]);

    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
        if (onClick) {
            onClick(newState);
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`flex items-center w-[2.875rem] pl-[0.2rem] py-3 rounded-full relative ${isActive ? "bg-green-500" : "bg-hamutea-black"} transition-all ease-in-out duration-300 cursor-pointer`}>
            <div
                className={`aspect-square h-5 border rounded-full bg-white absolute transition-transform duration-300 ${isActive ? "translate-x-full" : "translate-x-0"
                    }`}>
            </div>
        </div>
    );
}

export default ToggleButton;