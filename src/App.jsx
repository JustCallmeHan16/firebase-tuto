import { async } from '@firebase/util';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Auth } from './components/auth'
import { auth, db, storage } from './config/firebase_config'

const App = () => {

  const [list,setList] = useState([]);

  //New Movie States 
  const [newMovieTitle,setNewMovieTitle] = useState([''])
  const [newReleaseDate,setNewReleaseDate] = useState([''])
  const [isNewMovieOscar,setIsNewMovieOscar] = useState([false])

  //Update
  const [title,setTitle] = useState('')

  //File Upload State
  const [uploadFile,setUpoladFile] = useState(null)
  
  const moviesCollectionRef = collection(db,'movies')

  const getMoviesList = async() => {
    //Read the data from our database
    //Set the movie list
    try{
      const data = await getDocs(moviesCollectionRef)
      const filterData = data.docs.map( (doc) => ({
        ...doc.data(), 
        id : doc.id
      }))
      console.log(filterData)
      setList(filterData)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {

    getMoviesList();

  },[])

  const onSubmitMovie = async() => {
    try{
      await addDoc(moviesCollectionRef,{
        title : newMovieTitle,
        relaseDate : newReleaseDate,
        receivedAnOscar : isNewMovieOscar,
        userId : auth?.currentUser.uid
      });
      getMoviesList()
    } catch(err){
      console.log(err)
    }
  }

  const deleteMovie = async(id) => {
    try{
      const movieDoc = doc(db,'movies',id)
      await deleteDoc(movieDoc)
      getMoviesList()
    } catch(err){
      console.log(err)
    }
  }

  const updateMovieTitle = async(id) => {
    try{
      const movieDoc = doc(db,'movies',id)
      await updateDoc(movieDoc,{ title : title})
      getMoviesList()
    } catch(err){
      console.log(err)
    }
  }

  const fileUpload = async() => {
    if(!uploadFile) return;
    const filesFolderRef  = ref(storage,`File/${uploadFile.name}`);
    try{
      await uploadBytes(filesFolderRef,uploadFile)
    } catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <Auth/>
 
      <div>
        <input onChange={(e) => setNewMovieTitle(e.target.value)} placeholder='Movie Title ...' type="text" />
        <input onChange={(e) => setNewReleaseDate(Number(e.target.value))} placeholder='Release Date ...' type="number" />
        <input onChange={(e) => setIsNewMovieOscar(e.target.checked)} type="checkbox" />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {
          list?.map( (movie) => (
            <div>
              <h1
              style={{color : movie.receivedAnOscar? 'green' : 'red'}}
              >{movie.title}</h1>
              <p> date - {movie.relaseDate}</p>
              <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
              <input onChange={(e) => setTitle(e.target.value)} type='text' />
              <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
            </div>
          ))
        }
      </div>

      <div>
        <input type="file" onChange={(e) => setUpoladFile(e.target.files[0])} />
        <button onClick={(fileUpload)}>Uplaod File</button>
      </div>
    </div>
  )
}

export default App