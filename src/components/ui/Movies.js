import React from 'react'
import { useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import { ref, uploadBytes } from 'firebase/storage';
import Button from '@mui/material/Button'
import { signOut } from 'firebase/auth';

function Movies({setUser}) {
    const [config, setConfig] = useState({
        title : "",
        releaseDate:""
    });
    const [movieData, SetMovieData] = useState([]);
    const moviesCollectionRef = collection(db, "movies");
    const getMovieData = async () => {
        const data = await getDocs(moviesCollectionRef);
        SetMovieData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    useEffect(() => { 
        getMovieData();
    }, []);
    console.log(movieData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addDoc(moviesCollectionRef, config);
        console.log(response);
        getMovieData();
    }

    const handleDelete = async (id) => {
        const document1 = await doc(db, "movies", id);
        await deleteDoc(document1);
        getMovieData();
    }

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    // const handleUpdate = async (id) => {
    //     const document1 = await doc(db, "movies", id);
    //     await updateDoc(document1, config);
    //     getDocs();
    // }
    const [fileData, setFileData] = useState(null);

    const handleUpload = async () => {
        if (fileData == null) return;
        const storageRef = await ref(storage, `firebaseProFile/${fileData.name}`);
        await uploadBytes(storageRef, fileData);
    }
    return (
        <>
            <div style={{ display: "flex"}} >
            <Button variant="contained" onClick={handleSignOut} style={{ color: "white" }}>
                        Sign out
                    </Button>
            </div>
        <div style={{ display: "flex", gap: "20px", flexDirection: "column",alignItems:"center",justifyContent:"center" }}>
            <h4>CRUD </h4>
            <div>
                <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
                <button onClick={handleUpload}>upload</button>
            </div>
            <form onSubmit={handleSubmit} style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"10px"}}>
                <div><label>Enter title : </label><input required type="text" placeholder='title' name='title' value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} /></div>
                <div><label>Enter date : </label><input required type="date" placeholder='release date' name='releaseDate' value={config.date} onChange={(e) => setConfig({ ...config, releaseDate: e.target.value })} /></div>
                <button type='submit'>submit</button>
            </form>
            {movieData.map((data) => {
                return <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",backgroundColor:"black",width:"100%" }}>
                        <h1 style={{color:"white"}}>
                        <input required type="text" placeholder='title' name='title' value={data.title} onChange={(e) => setConfig({ ...config, title: e.target.value })} />
                        </h1>
                        <h3 style={{color:"white"}}>
                        <input required type="date" placeholder='release date' name='releaseDate' value={data.releaseDate} onChange={(e) => setConfig({ ...config, releaseDate: e.target.value })} />
                        </h3>
                        <div>
                            <button onClick={()=>handleDelete(data.id)}>Delete</button>
                        </div>
                    </div>
                </>
            })}
            </div>
            </>
    )
}

export default Movies