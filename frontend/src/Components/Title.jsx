import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <>
            <style>{`
                .title-wrapper {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .title-text {
                    font-size: 1.6rem;
                    letter-spacing: 0.06em;
                    font-family: 'Georgia', serif;
                }

                .title-text-muted {
                    color: #A8B5A0;
                    font-weight: 400;
                }

                .title-text-bold {
                    color: #8B5A4A;
                    font-weight: 700;
                }

                .title-accent {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .title-line-1 {
                    width: 40px;
                    height: 2px;
                    background: #D4755B;
                    border-radius: 2px;
                }

                .title-line-2 {
                    width: 24px;
                    height: 2px;
                    background: #A8B5A0;
                    border-radius: 2px;
                }

                @media (min-width: 640px) {
                    .title-line-1 { width: 52px; }
                    .title-line-2 { width: 32px; }
                }
            `}</style>

            <div className='title-wrapper'>
                <p className='title-text'>
                    <span className='title-text-muted'>{text1} </span>
                    <span className='title-text-bold'>{text2}</span>
                </p>
                <div className='title-accent'>
                    <span className='title-line-1'></span>
                    <span className='title-line-2'></span>
                </div>
            </div>
        </>
    );
};

export default Title;