import React, { useState, useEffect , useMemo } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
const Arr = new Array()
var count =0
var qNum = 0
var chan = false 
var flag = false
const FormTextExample = () => {
 
    const [question,setQuestion] =useState('')
    const [choiceA,setA] =useState('')
    const [ch,setch] =useState('')
    const [choiceB,setB] =useState('')
    const [choiceC,setC] =useState('')
    const [choiceD,setD] =useState('')
    const [Ans,setAns] =useState('')
    const [sub,setsub] =useState('')

    const [page,setPage] =useState("/")
  
  
    const toNextQusetion = (e, updatedAt) =>
    {
        const choices = new Array
        choices.push(choiceA)
        choices.push(choiceB)
        choices.push(choiceC)
        choices.push(choiceD)

        if (chan === true)
        {
            Arr[(3*qNum)] = question
            Arr[(3*qNum)+1] = choices
            Arr[(3*qNum)+2] = Ans
            
            chan = false
        }
        
       
    
       if(choiceA=="" || choiceA == undefined && choiceB=="" || choiceB== undefined && choiceC=="" || choiceC== undefined && choiceD=="" || choiceD== undefined && question=="" || question == undefined && Ans =="" || Ans == undefined)
       {
        flag = false
       }
        if (flag)
        {
        Arr.push(question)
        Arr.push(choices)
        Arr.push(Ans)
        flag=false
        }
        console.log(Arr)
      //  var myRadio = $("input[name=myRadio]");
       // console.log(myRadio)
        qNum++
        count ++
        if (Arr[(3*qNum)] ==undefined || Arr[(3*qNum)+1] == undefined || Arr[(3*qNum)+2] == undefined)
        {
            var l = ""
        setQuestion(l)
        setA(l)
        setB(l)
        setC(l)
        setD(l)
        setAns(l)
        $('button').click(function (e) {
            $('.mb-3').find('label').removeClass('active')
            .end().find('[type="radio"]').prop('checked', false);
          });
        }
        else
        {
        setQuestion(Arr[(3*qNum)])
        setA(Arr[(3*qNum)+1][0])
        setB(Arr[(3*qNum)+1][1])
        setC(Arr[(3*qNum)+1][2])
        setD(Arr[(3*qNum)+1][3])
        setAns(Arr[(3*qNum)+2]) 
    /*    $('button').click(function (e) {
            $('.mb-3').find('label').removeClass('active')
            .end().find('[type="radio"]').prop('checked', true);
          });*/
          
        }
        
         
        }  
    const toPrevQuesetion = (e, updatedAt) =>
    {
        if (qNum>0)
        qNum--

        setQuestion(Arr[(3*qNum)])
        setA(Arr[(3*qNum)+1][0])
        setB(Arr[(3*qNum)+1][1])
        setC(Arr[(3*qNum)+1][2])
        setD(Arr[(3*qNum)+1][3])
        setAns(Arr[(3*qNum)+2])
        
      
    }
    const Submit = () =>
    {
        const choices = new Array
        choices.push(choiceA)
        choices.push(choiceB)
        choices.push(choiceC)
        choices.push(choiceD)

        
        if (chan === true)
        {
            Arr[(3*qNum)] = question
            Arr[(3*qNum)+1] = choices
            Arr[(3*qNum)+2] = Ans
            count++
            chan = false
        }
       setsub(count)
    }
    useEffect(() =>{
        let cancel
         axios({
        method:"POST",
        url : "/Instructor/makeExam",
        params : {Subtitle:"Introduction To Mern Stack" , Blk : Arr , courseTitle:"Advanced Computer Lab" , id:"6384c29e9bed14d581bf6292"},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
       
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
 //   setChange(false)
    }, [sub])

    const getQusetion = (e, updatedAt) =>
    {
        setQuestion(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }
        else{
             flag = true
        }
     //   console.log(question)
    }

    const getChoiceA = (e, updatedAt) =>
    {
        setA(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceB = (e, updatedAt) =>
    {
        setB(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceC = (e, updatedAt) =>
    {
        setC(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getChoiceD = (e, updatedAt) =>
    {
        setD(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
      //  console.log(choiceA)
    }
    const getAns = (e, updatedAt) =>
    {
        setAns(e.target.value)
        if (qNum<Arr.length)
        {
            chan = true
        }else{
            flag = true
       }
     //   console.log(Ans)
    }
  return (
    <>
      <Form.Label htmlFor="Enterquestion">Question</Form.Label>
      <Form.Control
        type="String"
        id="Enterquestion"
        aria-describedby="Enterquestion"
        placeholder=" Enter a question here"
        value={question}
        onChange={getQusetion}
      />
      <Form.Text id="Enterquestion" muted>
      </Form.Text>
      <br />
       choices
      <br />
      <Form.Control type="text" placeholder="choice a" value = {choiceA}  onChange={getChoiceA} />
      <Form.Text id="choice a" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice b" value = {choiceB}  onChange={getChoiceB}/>
      <Form.Text id="choice b" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice c" value={choiceC}  onChange={getChoiceC} />
      <Form.Text id="choice c" muted></Form.Text>
      <br />
      <Form.Control type="text" placeholder="choice d"  value = {choiceD}  onChange={getChoiceD}/>
      <Form.Text id="choice d" muted></Form.Text>
      <br />
      
      <br />
      Answer
      <br />
      <br />
      <Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3" >
          <Form.Check
            inline
            Ans ='a'
           
            value={'a'}
            onChange={getAns}
            label="choice a"
            name="group1"
            type={type}
            id="a"
           
          />
          <Form.Check
            inline
            Ans = 'b'
            value={'b'}
            onChange={getAns}
            label="choice b"
            name="group1"
            type={type}
            
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            value={'c'}
            onChange={getAns}
            label="choice c"
            name="group1"
            type={type}
            
            
            id={`inline-${type}-3`}
          />
           <Form.Check
            inline
            value={'d'}
            onChange={getAns}
            label="choice d"
            name="group1"
            type={type}
            
            id={`inline-${type}-4`}
          />
        </div>
      ))}
    </Form>
    
    
    
   
   <div >
    <Button variant="primary" onClick={Submit}>supmit Exam</Button>{'   '}
    <Button  variant="primary" onClick={toPrevQuesetion} >go to previous Question </Button>{'   '}
    <Button  variant="primary" onClick={toNextQusetion} >Add Next Question </Button>{}
    </div>
   
    </>
  );
}


export default FormTextExample;