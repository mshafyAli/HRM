import { useState } from "react";

import {
  IoBagSharp,
  IoPeopleSharp,
  IoSettingsSharp,
} from "react-icons/io5";
import { FcLeave } from "react-icons/fc";
import {  LuArrowLeftRight } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import Employee from "./Employee";
import Leaves from "./Leaves";
import Dashboard from "./Dashboard";
import SettingsPage from "./SettingsPage";
import SalaryManaging from "./SalaryManaging";
import ActivityManager from "./ActivityManager";
import JobsManager from "./JobsManager";
import CandidatesManager from "./CandidatesManager";
import { BiFile, BiSolidDashboard } from "react-icons/bi";
import ResumeAnalysis from "./AnalysisResume";


const SideBar = () => {
  const [employee, setEmployee] = useState(false);
  const [leaves, setLeaves] = useState(false);
  const [dashboard, setDashboard] = useState(true);
  const [setting, setSetting] = useState(false);
  const [salary, setSalary] = useState(false);
  const [activity, setActivity] = useState(false);
  const [jobs, setJobs] = useState(false);
  const [candidates, setCandidates] = useState(false);
  const [resume, setResume] = useState(false);

  return (
    <div className="flex">
      <div className="  h-screen w-72">
        <ul className="m-3">
          <li
            className=" px-3 py-5 flex gap-4 items-center cursor-pointer bg-blue-500 text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(true);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <BiSolidDashboard />
            </div>
            <div>Dashboard</div>
          </li>
          <li
            className="px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(true);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <IoPeopleSharp />
            </div>
            <div>Employees</div>
          </li>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(true);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <FcLeave />
            </div>
            <div>Leaves Planner</div>
          </li>

          {/* <li className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl">
            <div>
              <LuArrowUpFromLine />
            </div>
            <div>Payrolls Exports</div>
          </li> */}
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(true);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <FaDollarSign />
            </div>
            <div>Salary Modeling</div>
          </li>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(true);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <LuArrowLeftRight />
            </div>
            <div>Activity Manager</div>
          </li>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(true);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <IoSettingsSharp />
            </div>
            <div>Settings</div>
          </li>
          <hr />
          <h1 className=" uppercase font-bold">Recruitment</h1>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(true);
              setCandidates(false);
              setResume(false);
            }}
          >
            <div>
              <IoBagSharp />
            </div>
            <div>Jobs</div>
          </li>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(true);
              setResume(false);
            }}
          >
            <div>
              <IoPeopleSharp />
            </div>
            <div>Candidates</div>
          </li>
          <li
            className=" px-3 py-4 flex gap-4 items-center cursor-pointer hover:bg-blue-500 hover:text-white rounded-xl"
            onClick={() => {
              setEmployee(false);
              setLeaves(false);
              setDashboard(false);
              setSetting(false);
              setSalary(false);
              setActivity(false);
              setJobs(false);
              setCandidates(false);
              setResume(true);
            }}
          >
            <div>
              <BiFile />
            </div>
            <div>Analysis Resume</div>
          </li>
        </ul>
      </div>
      <div className="  h-screen w-full bg-gray-100">
        {dashboard ? (
          <Dashboard />
        ) : "" || employee ? (
          <Employee />
        ) : "" || leaves ? (
          <Leaves />
        ) : "" || setting ? (
          <SettingsPage />
        ) : "" || salary ? (
          <SalaryManaging />
        ) : "" || activity ? (
          <ActivityManager />
        ) : "" || jobs ? (
          <JobsManager />
        ) : "" || candidates ? (
          <CandidatesManager />
        ) : "" || resume ? (
          <ResumeAnalysis />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SideBar;
