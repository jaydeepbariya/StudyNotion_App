import React from 'react'
import { Link } from 'react-router-dom';
import footerLogo from '../../assets/Logo/Logo-Full-Light.png';
import {FaCopy, FaFacebook, FaInstagram, FaTwitch, FaTwitter, FaYoutube} from 'react-icons/fa';
import {FooterLink2} from '../../data/footer-links';
import {AiOutlineCopyrightCircle, AiFillHeart} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='w-[100%] min-h-max bg-richblack-700'>
    <div>
        <div className='mx-auto flex justify-center items-start pt-6 flex-wrap'>
            <div className='flex justify-start items-start flex-wrap'>
                <div className='flex justify-center items-start gap-x-12 flex-wrap'>
                    <div className='flex flex-col justify-center flex-wrap max-md:items-center'>
                        <img src={footerLogo} alt='footer logo' />
                        <div className='flex flex-col gap-y-4 max-md:items-center mb-12'>
                            <p className='my-3 font-semibold'>Company</p>
                            <ul>
                                <li className='hover:text-richblack-300'><Link to={"/about"}>About</Link></li>
                                <li className='hover:text-richblack-300'><Link to={"/careers"}>Careers</Link></li>
                                <li className='hover:text-richblack-300'><Link to={"/affiliates"}>Affiliates</Link></li>
                            </ul>
                            <ul className='flex gap-x-3 mt-5'>
                                <li className='hover:text-richblack-300'><a href='https://www.facebook.com'><FaFacebook size={25}/></a></li>
                                <li className='hover:text-richblack-300'><a href='https://www.instagram.com'><FaInstagram size={25}/></a></li>
                                <li className='hover:text-richblack-300'><a href='https://www.twitter.com'><FaTwitter size={25}/></a></li>
                                <li className='hover:text-richblack-300'><a href='https://www.youtube.com'><FaYoutube size={25}/></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center max-md:my-6'>
                        <div className='flex flex-col'>
                        <p className='my-3 font-semibold'>Resources</p>
                        <ul>
                            <li className='hover:text-richblack-300'><Link to={"/articles"}>Articles</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/blog"}>Blog</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/chart-sheet"}>Chart Sheet</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/code-challenges"}>Code Challenges</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/docs"}>Docs</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/projects"}>Projects</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/videos"}>Videos</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/workspaces"}>Workspaces</Link></li>
                        </ul>
                        </div>
                        <div>
                        <p>Support</p>
                        <ul>
                            <li className='hover:text-richblack-300'><Link to={"/help-center"}>Help Center</Link></li>
                        </ul>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center max-md:my-6'>
                        <div className='flex flex-col'>
                        <p className='my-3 font-semibold'>Plans</p>
                        <ul>
                            <li className='hover:text-richblack-300'><Link to={"/paid-memberships"}>Paid Memberships</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/for-students"}>For Students</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/business-solutions"}>Business Solutions</Link></li>
                        </ul>
                        </div>
                        <div className='flex flex-col'>
                        <p className='my-3 font-semibold'>Community</p>
                        <ul>
                            <li className='hover:text-richblack-300'><Link to={"/forums"}>Forums</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/chapters"}>Chapters</Link></li>
                            <li className='hover:text-richblack-300'><Link to={"/events"}>Events</Link></li>
                        </ul>
                        </div>
                    </div>
                </div>

                <div className='w-[1px]  min-h-[500px] bg-richblack-900 mx-12 max-md:hidden'></div>

                <div className='flex justify-center items-start gap-x-12 flex-wrap max-md:mt-12'>
                    <div className='flex flex-col max-md:my-6'>
                        <p className='font-semibold'>{FooterLink2[0].title}</p>
                        <ul className='mt-5'>
                            {
                                FooterLink2[0].links.map((link,index)=>{
                                    return (
                                        <li className='hover:text-richblack-300' key={index} ><Link to={link.link}></Link>{link.title}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='flex flex-col max-md:my-6'>
                        <p className='font-semibold'>{FooterLink2[1].title}</p>
                        <ul className='mt-5'>
                            {
                                FooterLink2[1].links.map((link,index)=>{
                                    return (
                                        <li className='hover:text-richblack-300' key={index} ><Link to={link.link}></Link>{link.title}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className='flex flex-col max-md:my-6'>
                        <p className='font-semibold'>{FooterLink2[2].title}</p>
                        <ul className='mt-5'>
                            {
                                FooterLink2[2].links.map((link,index)=>{
                                    return (
                                        <li className='hover:text-richblack-300' key={index} ><Link to={link.link}></Link>{link.title}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-between ml-5'>
                <ul className='flex justify-center gap-x-3'>
                    <li><Link to={"/privacy-policy"}>Privacy Policy</Link></li>
                    <li><Link to={"/cookie-policy"}>Cookie Policy</Link></li>
                    <li><Link to={"/terms"}>Terms</Link></li>
                </ul>

                <div className='flex items-center mr-4'>Made with   <span><AiFillHeart color='red' size={25}/></span>  StudyNotion <span className='gap-x-3'><AiOutlineCopyrightCircle /></span> 2023</div>
            </div>
        </div>
    </div>
  )
}

export default Footer