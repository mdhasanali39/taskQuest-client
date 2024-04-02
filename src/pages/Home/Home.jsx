import { Link } from "react-router-dom";
import {FaArrowRightLong} from 'react-icons/fa6'

const Home = () => {
    return (
        <div className=" min-h-[86vh]">
      <div className="flex flex-col justify-center items-center gap-6 lg:flex-row-reverse pt-20 pb-8 px-5">
        <div className="flex-1">
        <img
          src="https://i.ibb.co/JcBc1ZZ/9693972.jpg"
          alt="task nestle banner image"
          className="max-w-md rounded-lg shadow-2xl"
        />
        </div>
        <div className="flex-1 pt-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Effortless Task Mastery <span className="text-action-text">with TaskQuest</span></h2>
          <p className="py-6">
          Elevate your productivity with TaskQuest. Effortless task management for streamlined success. Simplify, organize, and achieve more. Start today!
          </p>
          <div>
              <Link to="/task-management">
              <button
                type="submit"
                className="flex gap-3 items-center text-lg text-white font-semibold px-7 py-2 rounded-lg bg-action-bg border hover:bg-white hover:text-action-text hover:border-action-text transition ease-linear duration-300"
              >
                Start Create Task <FaArrowRightLong/>
              </button>
              </Link>
            </div>
        </div>
      </div>
    </div>
    );
};

export default Home;