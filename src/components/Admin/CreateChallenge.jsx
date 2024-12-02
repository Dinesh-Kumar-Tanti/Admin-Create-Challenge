import React, { useEffect, useState } from 'react';
import { getAllChallenges } from '../../utils/dataStore';
import imageToBase64 from 'image-to-base64/browser';
import { formatDate, addOneDay } from '../../utils/dateUtils';
import useChallengeDetails from '../../hooks/UseChallengeDetails';
import { Link, useNavigate } from 'react-router-dom';

const CreateChallange = () => {
    const { challengeDetails } = useChallengeDetails();
    const [formData, setFormData] = useState(getAllChallenges());
    const [input, setInput] = useState({
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        image: "",
        level: "Easy"
    });

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [progress, setProgress] = useState(0);
    const [popupMessage, setPopupMessage] = useState('');

    const getCurrentDate = () => {
        return Date.now().toString();
    }

    useEffect(() => {
        if (challengeDetails) {
            if (challengeDetails.status === 'past') {
                window.alert('Cannot modify a past event!');
                navigate('/');
                return;
            }
            // if(challengeDetails.status === 'active' && challengeDetails.startDate<currentDate){
                // setInput({
                //     name: challengeDetails?.name,
                //     startDate: challengeDetails?.startDate,
                //     endDate: challengeDetails?.endDate,
                //     description: challengeDetails?.description,
                //     image: challengeDetails?.image,
                //     level: challengeDetails?.level
                // });
            // }

            setInput({
                name: challengeDetails?.name,
                startDate: challengeDetails?.startDate,
                endDate: challengeDetails?.endDate,
                description: challengeDetails?.description,
                image: challengeDetails?.image,
                level: challengeDetails?.level
            });
        }
    }, [challengeDetails]);

    const currentDate = new Date().toISOString().slice(0, 10);
    const [startDate, setStartDate] = useState(currentDate);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
        if (name === 'startDate') {
            onStartDateChange(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (challengeDetails) {
            const updatedChallenges = formData.map((challenge) =>
                challenge.id === challengeDetails.id
                    ? { ...challenge, ...input }
                    : challenge
            );

            setFormData(updatedChallenges);
            localStorage.setItem('challenge', JSON.stringify(updatedChallenges));
            triggerPopup('Challenge updated successfully!');
        } else {
            const newChallenge = {
                id: getCurrentDate(),
                ...input
            };

            const localData = [newChallenge, ...formData];
            setFormData(localData);
            localStorage.setItem('challenge', JSON.stringify(localData));
            triggerPopup('Challenge created successfully!');
        }

        setInput({
            name: "",
            startDate: "",
            endDate: "",
            description: "",
            image: "",
            level: "Easy"
        });
    };

    function onFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const objectURL = URL.createObjectURL(file);
            imageToBase64(objectURL)
                .then((response) => {
                    setInput({ ...input, image: response });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const onStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const triggerPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setProgress(0);

        // Start the progress bar
        let progressValue = 0;
        const interval = setInterval(() => {
            progressValue += 1;
            setProgress(progressValue);
            if (progressValue === 100) {
                clearInterval(interval);
            }
        }, 30); // 30ms * 100 = 3000ms (3 seconds)

        // Hide the popup and navigate after 3 seconds
        setTimeout(() => {
            setShowPopup(false);
            navigate('/');
        }, 3000);
    };

    return (
        <div className='mb-10'>
            {showPopup && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded shadow-lg z-50">
                    {popupMessage}
                    <div className="relative mt-2 h-1 bg-white w-full">
                        <div
                            className="absolute left-0 top-0 h-full bg-green-700"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className='relative flex items-center pl-[50px] sm:pl-[90px] h-[107px] font-inter font-bold text-2xl leading-[29px] bg-[#F8F9FD]'>
                Challenge Details <span className='absolute invisible sm:visible sm:right-10 md:right-24 xlg:right-40'><Link to='/'><button className=' flex items-center gap-5 border-[2px] px-5 py-3 rounded-[10px] text-slate-600 text-xl hover:bg-slate-200'><img className='w-5 h-5' src="/assets/icons/arrow.png" alt="" />Go Back</button></Link></span>
            </div>
            <div className='pl-[50px] sm:pl-[90px]'>
                <form onSubmit={handleSubmit} className='flex flex-col w-72 gap-2'>
                    <div className='lsm:min-w-[453px] h-[305px] flex flex-col justify-between mt-6'>
                        <div className='flex flex-col gap-5'>
                            <label className='font-inter font-medium leading-[19px]' htmlFor="challange-name">Challenge Name</label>
                            <input className='rounded-md border-[1px] h-10 px-3' type="text"
                                name="name"
                                placeholder="Hackathon name..."
                                onChange={handleChange}
                                value={input.name}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-inter font-medium leading-[19px]' htmlFor="start-date">Start Date</label>
                            <input className='rounded-md border-[1px] h-10 px-3'
                                type="date"
                                placeholder='Add start date'
                                name='startDate'
                                min={currentDate}
                                onChange={handleChange}
                                value={input.startDate}
                                required
                                disabled={challengeDetails && challengeDetails.status === 'active' && input.startDate < currentDate}
                            />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-inter font-medium leading-[19px]' htmlFor="end-date">End Date</label>
                            <input className='rounded-md border-[1px] h-10 px-3' type="date"
                                placeholder='Add end date'
                                name='endDate'
                                min={input.startDate ? formatDate(addOneDay(new Date(input.startDate))) : currentDate}
                                onChange={handleChange}
                                value={input.endDate}
                                required
                            />
                        </div>
                    </div>

                    <div className='mt-10 flex flex-col gap-5'>
                        <label className='font-inter font-medium leading-[19px]' htmlFor="description">Description</label>
                        <textarea className='rounded-md border-[1px] sm:w-[453px]  lg:w-[817px] lsm:w-[455px] h-[292px] p-3'
                            name="description"
                            placeholder='Type hackathon details...'
                            onChange={handleChange}
                            value={input.description}
                            required
                        ></textarea>
                    </div>

                    <div className='mt-10 flex flex-col gap-5'>
                        <label className='font-inter font-medium leading-[19px]' htmlFor="image">Image</label>
                        <input
                            className='rounded-[5px] border-[1px] h-[39px] w-[232px] pt-1 pl-1'
                            type="file" accept="image/*"
                            name="image"
                            onChange={onFileUpload}
                            required={!challengeDetails}
                        />
                        {input.image && <img className="w-[354px] h-[174px] object-cover rounded-t-[8px]" src={`data:image/png;base64, ${input.image}`} alt="" />}
                    </div>

                    <div className='mt-10 flex flex-col gap-5'>
                        <label className='font-inter font-medium leading-[19px]' htmlFor="level">Level Type</label>
                        <select
                            className=' rounded-[5px] font-medium border-[1px] h-[39px] w-[232px] px-4 text-sm'
                            name="level"
                            onChange={handleChange}
                            value={input.level}
                            required
                        >
                            <option className='font-normal rounded-[5px]' value="Easy">Easy</option>
                            <option className='font-normal rounded-[5px]' value="Medium">Medium</option>
                            <option className='font-normal rounded-[5px]' value="Hard">Hard</option>
                        </select>
                    </div>

                    <button type='submit' className='my-16 bg-[#44924C] hover:bg-green-700 text-white w-[214px] h-[46px] rounded-[10px] px-[18px] py-[6px] font-medium text-[18px] text-center leading-5'>
                        {challengeDetails ? 'Save Changes' : 'Create Challenge'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateChallange;
