/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const getPafo = () =>{

    const [loading, setLoading] = useState(true);
    const [posts, setposts] = useState([]);
    const [Fname, setFname] = useState([]);
    const [Mname, setMname] = useState([]);
    const [Lname, setLname] = useState([]);
    const [sex, setSex]   = useState([]);
    const [Dob, setDob]   = useState([]);
    const [Add, setAdd]   = useState([]);
    const [Cno, setCno]   = useState([]);
    const [GN, setGN]    = useState([]);
    const [GCO, setGCO]   = useState([]);
    const [allergies, setAllergies] = useState([]);

    useEffect(() => {
        const getInfoFromFirebase = [];
        const patinfo = db.collection("Patient Information")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach(doc => {
                getInfoFromFirebase.push({
                ...doc.data(), key: doc.id,
            });
            });
            setposts(getInfoFromFirebase);
            setLoading(false);
            setFname(false);
            setMname(false);
            setLname(false);
            setSex(false);
            setDob(false);
            setAdd(false);
            setCno(false);
            setGN(false);
            setGCO(false);
            setAllergies(false);
            
        });
        //return funtion
        return () => patinfo();
    }, []);

    if(loading) {
        return <h1> Loading Data...</h1>;
    }
    return(
        <div patientInfo= 'container'>
        <h1> Patinet Info:</h1>
        {posts.length > 0 ?(
            posts.map((post) => <div key={post.key}>{post.patientInfo}</div> )
            
        ) : <h1> No Patient Info yet.</h1>}
        </div>
    );
};

export default getPafo;