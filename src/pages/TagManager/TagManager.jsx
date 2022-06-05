import React, { useContext, useState } from 'react'
import Api from '../../Api';
import { TagContext } from '../../context/tagContext';


function TagManagerPage() {
    const {tags, setTags} = useContext(TagContext);
    const [tag, setTag] = useState('');
    const handleTagChange = (e) => setTag(e.target.value);
    const submitTag = () =>{
        Api().post('/tags',{tag}).then(response =>{
            console.log(response);
            setTag('');
            setTags([...tags,{tag}]);
          }).catch(console.error)
    }
  return (
    <div className='tags-manager-container'>
      {tags.map(tagItem => (
        <li>{tagItem.tag}</li>
      ))}
        <input type="text" value={tag} onChange={handleTagChange}/>
        <button onClick={submitTag}>Add tag</button>
    </div>
  )
}

export default TagManagerPage