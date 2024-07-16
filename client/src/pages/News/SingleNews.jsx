import React from 'react';

const SingleNews = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="text-gray-600 mb-4">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="/" className="text-blue-500 hover:underline">Home</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <a href="/news" className="text-blue-500 hover:underline">News</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-800">New Exam Standards Implemented Worldwide</li>
                    </ol>
                </nav>

                {/* News Title and Date */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">New Exam Standards Implemented Worldwide</h1>
                    <p className="text-sm text-gray-500">June 26, 2024</p>
                </div>

                {/* News Sections */}
                <div className="mt-8">
                    {/* Section 1: Two Photos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                            <img src="https://s.tmimgcdn.com/scr/800x500/411900/back-to-school-joy-student-embrace-learning-journey-17_411988-original.jpg" alt="Exam Standards Image 1" className="object-cover" />
                        </div>
                        <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                            <img src="https://www.paripoornaacademy.com/neetcoachingcenter/images/paripoorna-neet-m-bannar-2.jpg" alt="Exam Standards Image 2" className="object-cover" />
                        </div>
                    </div>

                    {/* Section 2: Single Photo with Content */}
                    <div className="mt-8 grid grid-cols-1  gap-8 items-center">
                      
                        <div className="text-gray-700">
                            <p className="mb-4">Education boards across various countries have recently adopted new examination standards aimed at improving assessment accuracy and fairness.</p>
                            <p className="mb-4">These standards are designed to enhance the quality and reliability of exam results, ensuring better opportunities for students globally.</p>
                            <p className="mb-4">The implementation of these new standards follows extensive collaboration between educational experts, administrators, and policymakers.</p>
                            <p className="mb-4">It is seen as a significant step towards modernizing education systems and adapting to evolving learning needs.</p>
                        </div>
                    </div>

                    {/* Section 3: Two Photos with Content */}
                    <div className="mt-8">
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                            <div className="relative ">
                                <img src="https://static.toiimg.com/thumb/msid-110503375,width-1300,height-300,resizemode-4/110503375.jpg" alt="Exam Standards Image 4" className="object-contain" />
                            </div>
                       
                        </div>
                        <div className="mt-4 text-gray-700">
                            <p className="mb-4">The adoption of these new standards aims to ensure transparency and accountability in examination processes.</p>
                            <p className="mb-4">Educational institutions expect these standards to lead to fairer assessments and more reliable evaluation of student performance.</p>
                            <p className="mb-4">Collaboration among educational stakeholders has been crucial in developing a framework that aligns with global best practices.</p>
                            <p className="mb-4">By embracing these standards, education systems worldwide are taking a significant stride towards improving educational outcomes.</p>
                        </div>
                        <div className="mt-8 grid grid-cols-1  gap-8 items-center">
                      
                      <div className="text-gray-700">
                          <p className="mb-4">Education boards across various countries have recently adopted new examination standards aimed at improving assessment accuracy and fairness.</p>
                          <p className="mb-4">These standards are designed to enhance the quality and reliability of exam results, ensuring better opportunities for students globally.</p>
                          <p className="mb-4">The implementation of these new standards follows extensive collaboration between educational experts, administrators, and policymakers.</p>
                          <p className="mb-4">It is seen as a significant step towards modernizing education systems and adapting to evolving learning needs.</p>
                      </div>
                  </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleNews;
