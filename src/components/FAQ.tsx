import { useState } from 'react';

const Faq = () => {
    const FaqItem = ({ question, answer }: any) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleAnswer = () => {
            setIsOpen(!isOpen);
        };

        return (
            <div className="border-2 border-black-900 rounded-lg mb-4">
                <button className="flex items-center justify-between w-full p-8" onClick={toggleAnswer}>
                    <h1 className="font-semibold text-black-700">{question}</h1>
                    <span className="text-black-400 bg-black-200 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="black">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
                {isOpen && (
                    <div className="p-8 text-sm text-black-500">
                        {answer}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <section className="bg-white">
                <div className="container max-w-4xl px-6 py-10 mx-auto">
                    <h1 className="text-3xl font-bold text-left text-black-800 lg:text-3xl">Frequently asked questions</h1>

                    <div className="mt-12 space-y-8">
                        <FaqItem
                            question="How can I get in touch with you?"
                            answer="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?"
                        />
                        <FaqItem
                            question="Who are your internal users?"
                            answer="Your answer for the second question goes here."
                        />
                        <FaqItem
                            question="When did They take you to get the feedback ?"
                            answer="Your answer for the third question goes here."
                        />
                        <FaqItem
                            question="What is digital marketing in general?"
                            answer="Your answer for the fourth question goes here."
                        />
                        <FaqItem
                            question="What if i said that I am super proud of you?"
                            answer="Your answer for the fifth question goes here."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Faq;
