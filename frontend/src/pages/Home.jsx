import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/Homepage/HighlightText'
import CTAButton from '../components/core/Homepage/CTAButton'

import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import TimelineSection from '../components/core/Homepage/TimelineSection'
import LearningLangSection from '../components/core/Homepage/LearningLangSection'
import Footer from '../components/common/Footer'
import InstructorSection from '../components/core/Homepage/InstructorSection'
function Home() {
  return (
    <div>
      {/* Section1 */}
        <div className='relative mx-auto flex flex-col text-white justify-between w-11/12 items-center'>
            <Link to={"/signup"}>
                <button className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex flex-row items-center gap-3 py-[5px] px-10 group-hover:bg-richblack-900 rounded-full'>
                        <p>Become an Instructor</p>
                        <FaArrowRight></FaArrowRight>
                    </div>
                </button>
            </Link>

            <div className='text-center text-4xl font-semibold mt-6'>
                Empower Your Future with  
                <HighlightText text="Coding Skills" color="text-richblue-200"></HighlightText>
            </div>

            <div className='text-richblack-500 text-lg font-bold text-center w-[70%] mt-4'>
                Learn From Best Instructors and become the Best Coder from anywhere in the world. We provide weekly quizes, tests, fun game learning etc. 
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton linkto={"/signup"} active={true}>
                    Learn More
                </CTAButton>

                <CTAButton linkto={"/login"} active={false}>
                    Book a Demo
                </CTAButton>
            </div>


            <div className='mx-3 my-14 shadow-blue-200 w-[80rem]'>
                <video muted loop autoPlay>
                      <source src={Banner} type='video/mp4'></source>
                </video>
            </div>


            {/* Code Section 1 */}

        <div className='w-[80%] mx-auto'>
            <CodeBlocks 
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-bold text-white'>
                        Unlock Your 
                        <HighlightText text={" coding potential "} color={"text-richblue-200"}/>
                        with our online courses 
                    </div>
                }
                subheading={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab deserunt dignissimos velit assumenda minus recusandae voluptates similique aliquam? Nihil dolor nisi quibusdam laboriosam officiis eius eaque fugiat vitae illo molestiae."
                }
                ctabtn1={
                    {
                        text: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        text: "Learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={
                `!<DOCTYPE html>\n <html>\n <head>\n<title>Example</title>\n<link rel='stylesheet' href='style.css'>\n</head>\n<body>\n<h1>Hello</h1>\n</body>\n</html>`
                }
                codecolor={"text-yellow-25"}
            />
        </div>

        {/* Code Section 2 */}
        <div className='w-[80%] mx-auto pt-6'>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-bold text-white'>
                         Start Coding 
                        <HighlightText text={" Now"} color={"text-richblue-200"}/>
                    </div>
                }
                subheading={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab deserunt dignissimos velit assumenda minus recusandae voluptates similique aliquam? Nihil dolor nisi quibusdam laboriosam officiis eius eaque fugiat vitae illo molestiae."
                }
                ctabtn1={
                    {
                        text: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        text: "Learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={
                `!<DOCTYPE html>\n <html>\n <head>\n<title>Example</title>\n<link rel='stylesheet' href='style.css'>\n</head>\n<body>\n<h1>Hello</h1>\n</body>\n</html>`
                }
                codecolor={"text-yellow-25"}
            />
        </div>
        </div>


        
      {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                <div className='h-[150px'></div>
                <div className='flex gap-7 text-white'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex gap-2 items-center'>
                            Explore full Catalog
                            <FaArrowRight></FaArrowRight>
                        </div>
                    </CTAButton>  
                    <CTAButton active={false} linkto={"/login"}>
                        Learn More
                    </CTAButton> 
                </div>
                </div>


            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex items-center justify-between gap-7 mt-[110px]'>
                <div className='w-[45%] text-4xl font-semibold'>
                    Get the skills you need for a
                    <HighlightText text={" job that is in demand."} color={"text-richblue-200"}></HighlightText>
                </div>
                <div className='w-[40%] flex flex-col gap-6 items-start'>
                    <p className='text-[16px]'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium accusamus excepturi a tempora dignissimos ratione. Magni odio est voluptatem ad laudantium quibusdam, molestiae nesciunt deleniti fuga sapiente ducimus consequatur animi!
                    </p>
                    <CTAButton linkto={'/signup'} active={true}>Learn More</CTAButton>
                </div>
            </div>

            <TimelineSection />
            <LearningLangSection />

        </div>

      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white mb-7'>

                <InstructorSection />

        {/* <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2> */}
        {/* Review Slider here */}
</div>

      {/* Footer */}
        <Footer />

    </div>
  )
}

export default Home
