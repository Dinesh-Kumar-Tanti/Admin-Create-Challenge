import { NavLink } from "react-router-dom";

const Error = ()  => {
    return (
        <div className="flex items-center justify-center flex-col">
            <img className="w-64" src="/assets/icons/error-404_2032412.png" alt="Error" />
            <NavLink className="bg-blue-600 text-white px-4 py-2 rounded-[4px]" to="/">Back to home</NavLink>
        </div>
    )
}

export default Error