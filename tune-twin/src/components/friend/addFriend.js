import React, { useState } from 'react'
import './friend.css'

function AddFriend(props) {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(inputText)
        await fetch('http://127.0.0.1:8080/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sessionStorage.getItem('email'),
                friendEmail: inputText
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Post created:', data);
                setInputText(''); // Reset the input field after successful submission
            })
            .catch(error => console.error('Error:', error));
        props.callbackFn(!props.callback)
    };
    return (
        <div className="add-friend">
            <h2 className="friend-heading">Add Friend</h2>
            <form onSubmit={handleSubmit}>
                <input className='friend-input'
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Enter friend's email"
                />
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddFriend
