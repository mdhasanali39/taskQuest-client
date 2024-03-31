import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItems = ({ handleItemClick, active, setActive, handleLogOut }) => {

    const classesForTransition = "transition ease-linear duration-[250]"

  return (
    <>
      <li
        onClick={handleItemClick}
        className={`text-lg font-semibold`}
      >
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-action-text underline" : `  text-gray-500 hover:text-action-text ${classesForTransition}`
          }
        >
          Home
        </NavLink>
      </li>
      <li
        onClick={handleItemClick}
        className={`text-lg font-semibold hover:text-action-text ${classesForTransition}`}
      >
        <NavLink
          to="/task-management"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-action-text underline" : `  text-gray-500 hover:text-action-text ${classesForTransition}`
          }
        >
          Manage Task
        </NavLink>
      </li>
      {/* { */}
      {/* user ? ( */}
      {/* <li>
          <div className="flex lg:block pr-4">
            <div className="relative left-1/2 max-[1023.9px]:-translate-x-1/2">
              <div onClick={() => setActive(!active)}>
                <img
                  className="w-8 h-8 object-cover rounded-full"
                  src={user?.photoURL}
                />
              </div>
              <div
                className={`${
                  active ? "block" : "hidden"
                } absolute max-[1023.9px]:left-1/2 max-[1023.9px]:-translate-x-1/2 max-[1023.9px]:-top-[170px] z-50 lg:right-[5%] min-w-max border border-action-primary-clr bg-white p-4 rounded-md`}
              >
                <div onClick={() => setActive(!active)}>
                  <img
                    className="w-12 h-12 mx-auto object-cover mb-4 rounded-full"
                    src={user?.photoURL}
                  />
                </div>
                <h3 className="text-center">{user?.displayName}</h3>
                <button
                  onClick={handleLogOut}
                  className={`flex gap-1 items-center text-lg text-white font-semibold px-4 py-1 rounded-lg bg-action-bg border hover:bg-white hover:text-action-text hover:border-action-text ${classesForTransition}`}
                >
                  <span>
                    <BiLogOut />
                  </span>
                  Log-out
                </button>
              </div>
            </div>
          </div>
        </li> */}
      {/* ) : ( */}
      <li>
        <Link to={"/login"}>
          <button
            onClick={handleItemClick}
            className={`text-lg font-semibold px-4 py-2 bg-action-bg text-white border border-action-text rounded-md hover:bg-transparent hover:text-action-text hover:border-action-text ${classesForTransition}`}
          >
            Login
          </button>
        </Link>
      </li>
      {/* )} */}
    </>
  );
};

NavItems.propTypes = {
  handleItemClick: PropTypes.func,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default NavItems;
