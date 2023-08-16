import React, { useState } from 'react'
import './Home.css'
import data from '../data.json'

import { IconContext } from "react-icons";
import { AiTwotoneSave, AiFillDelete, AiOutlineFilter, AiOutlineRight, AiOutlineLeft, AiOutlineHolder, AiOutlineDown } from 'react-icons/ai'

const Home = () => {
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [emails, setEmails] = useState(data);

    const handleMasterSelect = () => {
        if (selectedEmails.length === emails.length) {
            setSelectedEmails([]);
        } else {
        const allEmailIds = emails.map(email => email.id);
            setSelectedEmails(allEmailIds);
        }
    };

    const handleEmailSelect = (emailId) => {
        if (selectedEmails.includes(emailId)) {
            setSelectedEmails(selectedEmails.filter(id => id !== emailId));
        } else {
            setSelectedEmails([...selectedEmails, emailId]);
        }
        
    };

    const isEmailSelected = (emailId) => selectedEmails.includes(emailId);
    
    const handleDeleteSelected = () => {
        const updatedEmails = emails.filter(email => !selectedEmails.includes(email.id));
        setEmails(updatedEmails);
        setSelectedEmails([]);
    };

    function CommaSeparatedValues({ values }) {
        // Split comma-separated values into an array
        const valuesArray = values.split(',');

        if(valuesArray.length > 2) {
            return (
                <>
                    <span className='tag-content'>{valuesArray[0].trim()}</span>
                    <span className='tag-content'>{valuesArray[1].trim()}</span>
                    <span className='tag-content'>{valuesArray.length - 2}+</span>
                </>
            );
        }
    }

    function CommaSeparatedAllValues({ values }) {
        // Split comma-separated values into an array
        const valuesArray = values.split(',');

        return (
            <>
                {valuesArray.map((value, index) => (
                    <span key={index} className='tag-content'>{value.trim()}</span>
                ))}
            </>
        );
    }

    function Email({ id, date, sender_name, sender_email, tags, subject, content, isChecked, onChange }) {
        const [expanded, setExpanded] = useState(false);
        
        const toggleExpand = () => {
            setExpanded(!expanded);
        };
        
        return (
            <>
                <div className="email-container"
                    onClick={toggleExpand}>
                    <div className='email-content'>
                        <div className='left-content-email'>
                            <IconContext.Provider value={{ color: '#000000', className: 'outline-icon', size: '1em' }}>
                                <AiOutlineHolder />
                            </IconContext.Provider>
                            <input 
                                type='checkbox'
                                checked={isChecked} 
                                onChange={onChange}
                            />
                            <div className='green-circle-symbol'></div>
                            <div className='email-date'>
                                <span className='date-num'>
                                    {date.substring(5, 6) === ',' ?
                                        <div>
                                            {date.substring(4, 5)}
                                        </div> :
                                        <div>
                                            {date.substring(4, 6)}
                                        </div> 
                                    }
                                </span>
                                <span className='date-month'>{date.substring(0, 3)}</span>
                            </div>
                            <div className='grey-circle-symbol'>
                                <span className='logo-TA'>TA</span>
                            </div>
                            <div className='email-title'>
                                <div className='email-title-content'>
                                    <span className='title-email'>Fwd: {subject}</span>
                                    <span className='from-content'>{sender_name} &lt; {sender_email} &gt; | {date} at 3:41PM</span> 
                                </div>
                            </div>
                        </div>
                        <div className='right-content-email'>
                            <div className='tags-container'>
                                {!expanded ? (
                                    <CommaSeparatedValues values={tags} />
                                ) : (<></>)}
                            </div>
                            <div>
                                {/* duration */}
                            </div>
                                {!expanded ? (
                                    <IconContext.Provider value={{ color: '#898989', className: 'right-expand-icon', size: '1em' }}>
                                        <AiOutlineRight />
                                    </IconContext.Provider>
                                ) : (
                                    <IconContext.Provider value={{ color: '#898989', className: 'right-expand-icon', size: '1em' }}>
                                        <AiOutlineDown />
                                    </IconContext.Provider>
                                )}
                        </div>
                    </div>
                    {expanded && 
                        <div className='expanded-email-container'>
                            <div className='upper-expanded-container'>
                                <div>
                                    <span className='expanded-email-sender'>
                                        {sender_name}
                                    </span>
                                    <br />
                                    <span className='expanded-email-date'>
                                        {date}
                                    </span>
                                </div>
                                <div className='tags-container'>
                                    <CommaSeparatedAllValues values={tags} />
                                </div>
                            </div>
                            <div className='email-content-container'>
                                {content}
                            </div>
                            <div className='expanded-email-credentials'>
                                <div>From: <span className='expanded-email-main-content'>{sender_name} &lt;{sender_email}&gt;</span></div>
                                <div>Date: <span className='expanded-email-main-content'>{date}</span></div>
                                <div>Subject: <span className='expanded-email-main-content'>{subject}</span></div>
                                <div>To:  <span className='expanded-email-main-content'>Isabel Bowen &lt;sbtest.isabel@gmail.com&gt;</span></div>
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }

    return (
        <div className='main-container'>
            <div className='navbar'>
                <div className='button-container'>
                    <input 
                        type='checkbox'
                        checked={emails.length === 0 ? false : selectedEmails.length === emails.length}
                        onChange={handleMasterSelect}
                    />
                    <button className='save-button'>
                        <span className='save-content'>SAVE</span>
                        <IconContext.Provider value={{ color: '#7db182', className: 'save-icon', size: '1.5em' }}>
                            <AiTwotoneSave />
                        </IconContext.Provider>
                    </button>
                    <button className='manage-filters-button'>
                        <span className='manage-filters-content'>
                            MANAGE FILTERS 
                        </span>
                        <IconContext.Provider value={{ color: '#969796', className: 'filter-icon', size: '1.5em' }}>
                            <AiOutlineFilter />
                        </IconContext.Provider>
                    </button>
                    <button className='delete-button' onClick={handleDeleteSelected}>
                        <span className='delete-content'>
                            DELETE 
                        </span>
                        <IconContext.Provider value={{ color: '#ce574d', className: 'delete-icon', size: '1.5em' }}>
                            <AiFillDelete />
                        </IconContext.Provider>
                    </button>
                </div> 
                <div className='page-external-container'>
                    <div className='page-internal-container'>
                        <IconContext.Provider value={{ color: '#000000', className: 'left-page-icon', size: '1em' }}>
                            <AiOutlineLeft />
                        </IconContext.Provider>
                        50 of 150
                        <IconContext.Provider value={{ color: '#000000', className: 'right-page-icon', size: '1em' }}>
                            <AiOutlineRight />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
            <div className='body-container'>
                <span className='unread-content'>UNREAD</span>
                <br />
                {emails.map((item) => (
                    <Email 
                        key={item.id} 
                        date={item.date} 
                        sender_name={item.sender_name} 
                        sender_email={item.sender_email} 
                        tags={item.tags} 
                        subject={item.subject} 
                        content={item.content}
                        isChecked={isEmailSelected(item.id)}
                        onChange={() => handleEmailSelect(item.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;

// rfce

// TODO
// 2. delete selected email