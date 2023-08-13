import "./UserList.css"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserTie } from "@fortawesome/free-solid-svg-icons";

const UserList = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("https://api.github.com/users?per_page=100")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const NameCard = ({avatarUrl, login, siteAdmin}) => {
        return (
            <div className="card-body">
                <img className="avatar" src={avatarUrl}/>
                <div className="text-container">
                    <h3>{login}</h3>
                    {
                        siteAdmin ? 
                        (<div><FontAwesomeIcon color="navy" size="2xl" icon={faUserTie}/><span style={{marginLeft: "0.5rem", fontWeight: "bold", color: "#585858"}}>STAFF</span></div>) :
                        (<></>)
                    }
                    
                </div>
            </div>
        )
    }

    return (
        <div className="list">
            {users.map((user) => {
                return (
                    <>
                        <NameCard key={user.id} avatarUrl={user.avatar_url} login={user.login} siteAdmin={user.site_admin}/>
                    </>
                )
            })}
        </div>
    );


}



export default UserList;