import Icon from "@components/common/Icon";

const SearchInput = ({ placeholder = "Search", onChange }) => {
    return (
        <div className="relative bg-gray-50 px-5 flex items-center rounded-full gap-3">
            <Icon name="Search" className="text-gray-500 w-5 h-5" />
            <input
                type="text"
                placeholder={placeholder}
                className="appearance-none border-none outline-none bg-transparent py-2 m-0 shadow-none focus:outline-none w-full"
                onChange={onChange}
            />
        </div>
    );
}

export default SearchInput;