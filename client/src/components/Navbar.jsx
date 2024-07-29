import { IoPerson } from "react-icons/io5";
import { BiMessageSquareDetail } from "react-icons/bi";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center py-3 px-2  ">
        <div className="logo font-medium cursor-pointer">
          <span className=" text-2xl font-medium text-blue-600">SQ</span> HR
          Limited
        </div>
        <ul className="flex items-center gap-5">
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href=""></a>
          </li>
          <li>
            <a href="">
              <BiMessageSquareDetail size={25} />
            </a>
          </li>
          <li className=" w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <a href="">
              <IoPerson size={25} />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
