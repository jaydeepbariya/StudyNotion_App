import React from "react";
import { Link } from "react-router-dom";
import footerLogo from "../../assets/Logo/Logo-Full-Light.png";
import {
  FaCopy,
  FaFacebook,
  FaInstagram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";
import { AiOutlineCopyrightCircle, AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-screen min-h-max flex flex-col justify-center items-center gap-12 pt-12 bg-richblack-900">
      <div className="w-11/12 mx-auto grid grid-cols-2 grid-rows-1 max-md:grid-cols-1">
        <div className="w-full grid grid-cols-3 grid-rows-1 max-sm:grid-cols-1">
          <div className="w-1/3 max-sm:m-4">
            <p className="font-bold mb-4">Company</p>
            <ul>
              <li className="hover:text-richblack-300">
                <Link to={"/about"}>About</Link>
              </li>
              <li className="hover:text-richblack-300">
                <Link to={"/careers"}>Careers</Link>
              </li>
              <li className="hover:text-richblack-300">
                <Link to={"/affiliates"}>Affiliates</Link>
              </li>
            </ul>
            <ul className="flex gap-x-3 mt-5">
              <li className="hover:text-richblack-300">
                <a href="https://www.facebook.com">
                  <FaFacebook size={25} />
                </a>
              </li>
              <li className="hover:text-richblack-300">
                <a href="https://www.instagram.com">
                  <FaInstagram size={25} />
                </a>
              </li>
              <li className="hover:text-richblack-300">
                <a href="https://www.twitter.com">
                  <FaTwitter size={25} />
                </a>
              </li>
              <li className="hover:text-richblack-300">
                <a href="https://www.youtube.com">
                  <FaYoutube size={25} />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-1/3 max-sm:m-4">
            <div>
              <p className="font-bold mb-4">Resources</p>
              <ul>
                <li className="hover:text-richblack-300">
                  <Link to={"/articles"}>Articles</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/blog"}>Blog</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/chart-sheet"}>Chart Sheet</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/code-challenges"}>Code Challenges</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/docs"}>Docs</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/projects"}>Projects</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/videos"}>Videos</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/workspaces"}>Workspaces</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold my-4">Support</p>
              <ul>
                <li className="hover:text-richblack-300">
                  <Link to={"/help-center"}>Help Center</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/3 max-sm:m-4">
            <div>
              <p className="font-bold mb-4">Plans</p>
              <ul>
                <li className="hover:text-richblack-300">
                  <Link to={"/paid-memberships"}>Paid Memberships</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/for-students"}>For Students</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/business-solutions"}>Business Solutions</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="my-4 font-bold">Community</p>
              <ul>
                <li className="hover:text-richblack-300">
                  <Link to={"/forums"}>Forums</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/chapters"}>Chapters</Link>
                </li>
                <li className="hover:text-richblack-300">
                  <Link to={"/events"}>Events</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full grid grid-cols-3 grid-rows-1 max-sm:grid-cols-1">
          <div className="w-1/3 max-sm:m-4">
            <p className="font-bold mb-4">{FooterLink2[0].title}</p>
            <ul className="mt-5">
              {FooterLink2[0].links.map((link, index) => {
                return (
                  <li className="hover:text-richblack-300" key={index}>
                    <Link to={link.link}></Link>
                    {link.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-1/3 max-sm:m-4">
            <p className="font-bold mb-4">{FooterLink2[1].title}</p>
            <ul className="mt-5">
              {FooterLink2[1].links.map((link, index) => {
                return (
                  <li className="hover:text-richblack-300" key={index}>
                    <Link to={link.link}></Link>
                    {link.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-1/3 max-sm:m-4">
            <p className="font-bold mb-4">{FooterLink2[2].title}</p>
            <ul className="mt-5">
              {FooterLink2[2].links.map((link, index) => {
                return (
                  <li className="hover:text-richblack-300" key={index}>
                    <Link to={link.link}></Link>
                    {link.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex w-11/12 mx-auto my-6 justify-between ml-5 max-md:flex-col max-md:justify-center max-md:items-center">
        <ul className="flex justify-center items-center gap-3 max-md:py-3">
          <li>
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </li>
          <li>
            <Link to={"/cookie-policy"}>Cookie Policy</Link>
          </li>
          <li>
            <Link to={"/terms"}>Terms</Link>
          </li>
        </ul>

        <div className="flex items-center max-md:py-6">
          Made with{" "}
          <span className="mx-1">
            <AiFillHeart color="red" size={25} />
          </span>{" "}
          StudyNotion{" "}
          <span className="mx-1">
            <AiOutlineCopyrightCircle />
          </span>{" "}
          2023
        </div>
      </div>
    </div>
  );
};

export default Footer;
