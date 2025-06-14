import React, { useState } from "react";
import Icon from "../icon/Icon";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useFilterProducts } from "../../hooks/useFilterProducts";
import type { ProductFilterRequest } from "../../types/ProductTypes";

interface SearchDropDownProps {
  placeholder?: string;
  onSelect?: (value: string) => void;
  onClick?: () => void;
}

const SearchDropDown: React.FC<SearchDropDownProps> = ({ placeholder = "Buscar...", onSelect, onClick }) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const filter: ProductFilterRequest = {
        name: value
    };

    const { data: suggestions } = useFilterProducts(filter, 0, 10);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const handleSearch = () => {
        if (value.trim()) {
            navigate('/search', { state: { searchQuery: value } });
        }
    };

    return (
        <div className="relative w-full max-w-full sm:max-w-md min-w-0">
            <div className="hidden sm:block w-full">
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={() => setTimeout(() => setIsFocused(false), 100)}
                    className="w-full bg-white text-black pl-4 pr-8 sm:pr-10 py-2 text-sm sm:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute top-0 right-0 h-full w-8 sm:w-10">
                    <Button
                        type="button"
                        onClick={handleSearch}
                        className="w-full h-full flex items-center justify-center rounded-tr-xl rounded-br-xl bg-gray-100 hover:bg-gray-300 p-1.5 sm:p-2"
                    >
                        <Icon
                            name="search"
                            className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5"
                            size={14}
                        />
                        <span className="sr-only">Buscar</span>
                    </Button>
                </div>
            </div>
            {isFocused && value && suggestions?.content && suggestions.content.length > 0 && (
                <ul className="absolute z-50 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md mt-1">
                    {suggestions.content.map((product) => (
                        <li
                            key={product.id}
                            className="text-xs sm:text-sm md:text-base text-black px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={() => {
                                onSelect?.(product.name);
                                setValue(product.name);
                            }}
                        >
                            {product.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchDropDown;