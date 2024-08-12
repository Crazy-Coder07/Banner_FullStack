import React, { useState, useEffect } from 'react';
import "./Banner.css";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Banner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [bannerText, setBannerText] = useState("");
    const [bannerLink, setBannerLink] = useState("");
    const [timer, setTimer] = useState();
    const [penclick, setPenclick] = useState(false);
    const [bannerId, setBannerId] = useState();

    const [tempBannerText, setTempBannerText] = useState("");
    const [tempBannerLink, setTempBannerLink] = useState("");
    const [tempTimer, setTempTimer] = useState();

    useEffect(() => {
        if (timer > 0 && isVisible) {
            const intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (timer === 0) {
            setIsVisible(false);
        }
    }, [timer, isVisible]);

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/banner/get-banner');

                if (response?.data?.success) {
                    const data = response.data.data.bannerData;
                    setBannerText(data.description);
                    setBannerLink(data.link);
                    setTimer(data.timer);
                    setBannerId(data.id);

                    setTempBannerText(data.description);
                    setTempBannerLink(data.link);
                    setTempTimer(data.timer);
                }
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBannerData();
    }, []);

    const handleSaveChanges = async () => {
        try {
            const response = await axios.patch('http://localhost:8080/banner/update-banner', {
                "description": tempBannerText,
                "link": tempBannerLink,
                "timer": tempTimer
            },
                {
                    headers: {
                        "id": bannerId
                    }
                });
            if (response) {
                toast.success("Banner updated successfully");
                setPenclick(false);

                setBannerText(tempBannerText);
                setBannerLink(tempBannerLink);
                setTimer(tempTimer);
            }
        } catch (error) {
            console.error('Error saving banner changes:', error);
            alert('Failed to save changes.');
        }
    };

    const toggleBanner = () => {
        setIsVisible(!isVisible);
    };

    const formatTime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${days} days ${hours} hours ${minutes} minutes ${secs} seconds`;
    };

    return (
        <div>
            <ToastContainer />
            <div className='mainbnr'>
                <div className='bnrhead'>
                    {isVisible && (
                        <div className='bnr'>
                            <div className="banner-content">
                                <h1>{bannerText}</h1>
                                <p>Apply the Code TUFPLUS and get the extra 30% off</p>
                                <a href={bannerLink} target='_blank'>Click Here</a>
                            </div>
                            <div className="banner-image">
                                <div className="timer-label">Time left:</div>
                                <div className="formatted-timer">
                                    {formatTime(timer)}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className='dashboard'>
                    <div className='toggle-wrapper' onClick={toggleBanner}>
                        <div className={`toggle-container ${isVisible ? 'on' : ''}`}>
                            <div className="toggle-circle"></div>
                        </div>
                        <span className="toggle-label">{isVisible ? 'On' : 'Off'}</span>
                    </div>

                    <div className='dashboard-field'>
                        <label>
                            Banner Description:
                            <input
                                type='text'
                                value={tempBannerText}
                                onChange={(e) => setTempBannerText(e.target.value)}
                                className={`dashboard-input ${!penclick ? "disabled-input" : ""}`}
                                disabled={!penclick}
                            />
                            <span className='edit-icon' onClick={() => setPenclick(true)}>✎</span>
                        </label>
                    </div>

                    <div className='dashboard-field'>
                        <label>
                            Banner Timer (in minutes):
                            <input
                                type='number'
                                value={Math.floor(tempTimer / 60)}
                                onChange={(e) => setTempTimer(e.target.value * 60)}
                                className={`dashboard-input ${!penclick ? "disabled-input" : ""}`}
                                disabled={!penclick}
                            />
                            <span className='edit-icon' onClick={() => setPenclick(true)}>✎</span>
                        </label>
                    </div>

                    <div className='dashboard-field'>
                        <label>
                            Banner Link:
                            <input
                                type='url'
                                value={tempBannerLink}
                                onChange={(e) => setTempBannerLink(e.target.value)}
                                className={`dashboard-input ${!penclick ? "disabled-input" : ""}`}
                                disabled={!penclick}
                            />
                            <span className='edit-icon' onClick={() => setPenclick(true)}>✎</span>
                        </label>
                    </div>

                    <button
                        onClick={handleSaveChanges}
                        className={`save-button ${!penclick ? "disabled-button" : ""}`}
                        disabled={!penclick}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <div className='main-content' style={{ marginTop: !isVisible ? "-25.6%" : "-11%" }}>
                <h1>Welcome to Our Exclusive Offer!</h1>
                <h2>Don't Miss Out on Our Special Banner Event!</h2>
                <p>
                    We are excited to introduce a unique opportunity to experience our latest offers with a special banner that will be visible for a limited time only. Our banner features a countdown timer to ensure you don't miss out on this exclusive event.
                </p>
                <h3>What You Need to Know:</h3>
                <ul>
                    <li><strong>Banner Visibility:</strong> The banner is currently active and will be displayed until the countdown reaches zero.</li>
                    <li><strong>Countdown Timer:</strong> The timer will show you the exact remaining time before the banner disappears, giving you the chance to act quickly and take advantage of our special offers.</li>
                </ul>
                <h3>Why Act Now?</h3>
                <ul>
                    <li><strong>Limited-Time Offers:</strong> Take advantage of time-sensitive discounts and promotions.</li>
                    <li><strong>Exclusive Content:</strong> Access exclusive content and updates available only through this banner.</li>
                </ul>
                <p>Thank you for being a valued visitor.</p>
            </div>
        </div>
    );
};

export default Banner;
