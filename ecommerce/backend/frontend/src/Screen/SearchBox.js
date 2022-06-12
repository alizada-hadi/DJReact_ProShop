import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
function SearchBox() {
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefaul()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
        }else{
            navigate("")
        }
    }
  return (
    <Form onSubmit={submitHandler}>
        <Form.Control
            type="text"
            name="keyword"
            placeholder='Search Products...'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
        >
        </Form.Control>
        

    </Form>
  )
}

export default SearchBox