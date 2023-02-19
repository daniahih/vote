import './voitingPage.css'
import { useState } from "react"
// import AdminPage from './AdminPage'
 //becouse i want an array with 4 names and 4 imges and 4 counters i but all the info on object ,, and its easy for me to loop using map 
const Votes = [
  {
    id: 1,
    name: "Erdogan",
    img: "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/KPDUNJV2LJJ6ZNY6LMKWMZPE4Q.jpg",
    count: 200,
  },
  {
    id: 2,
    name: "Volodymyr Zelenskyy",
    img: "https://static.timesofisrael.com/ar/uploads//2022/07/AP22174653248391-640x400-1.jpeg",
    count: 30,
  },
  {
    id: 3,
    name: "Vladimir Putin",
    img: "https://gumlet.assettype.com/sabq%2F2023-02%2Fb0a178d7-7b6c-460c-a16c-d12fb97fb04e%2F209928.jpeg?auto=format%2Ccompress&fit=max&w=400&dpr=2.6",
    count: 12,
  },
  {
    id: 4,
    name: "Ertugrul",
    img: "https://i1.sndcdn.com/artworks-000742473226-zvnh93-t500x500.jpg",
    count: 44,
  },
]

const Voting = () => { // decaring a parent commponents 
  const [votes, setVotes] = useState(Votes)
  const [disabledButtonId, setDisabledButtonId] = useState(null)
  // this is for button after voted 
  const [Done, setDone] = useState(false);
  const [Change, setChange] = useState(false);
  const [isVote,setisVote]=useState(false)



  const handleVote = (id) => {
    setVotes((votes) =>
      votes.map((vote) => {
        if (vote.id ===id ) {
            return Object.assign({}, vote, { count: vote.count + 1 , disabled:true}) // when i click to the btn the counter will increment // disabled the btn 
            
            
        }
        return vote
    })
    )
    setDisabledButtonId(id)
    setDone(true);
    setChange(true);
    setisVote(true)
      localStorage.setItem("votes", JSON.stringify(votes));
  }
  const handleDone = () => {
    alert('thank you for voiting')
  };
  
  const handleChangeVote = () => {
    setVotes((votes) =>
      votes.map((vote) => {
        if (vote.id === disabledButtonId) {
          return Object.assign({}, vote, { count: vote.count -1 , disabled:true})
        }
        return vote
      })
      )
      setDisabledButtonId(null )
  };
  // when click to the button i made a use state 

  return (// parent componet will return 4 img,counter,names
    <div className='vote'>
      {votes.map((vote) => (
        <div  key={vote.id}>
          <Button name={vote.name} onClick={() => handleVote(vote.id)} disabled={disabledButtonId !== null } // will disabled all the button after the count 
/>
          {/* so here  i do a button componet and render it on the parents*/}
          <Image img={vote.img} /> 
          <CountComponent count={vote.count} />
{/* 
          {voted && ( // here he is voted so its turn to true 
        <div>
          <p>Thank you for voting!</p>
          <button>Logout</button>
          <AdminPage/>
        </div>
      )} */}
      {Done && <button onClick={handleDone} >Done </button>}
      {Change && <button onClick={handleChangeVote} disabled={disabledButtonId === null } >Change Vote</button>}
        </div>
      ))}
    </div>

  )
}

const CountComponent = (props) => {
  return <h1>{props.count}</h1>
} 


const Image = (props) => {
  return (
    <div>
      <img className='img'  alt={props.key} src={props.img} />
    </div>
  )
}
// i do a componets for img sr =c and take the src form the array

const Button = (props) => { 
  return <button className='button' onClick={props.onClick} disabled={props.disabled}>{props.name}</button>
} 

// on click props will  told me that i can on click in the render button to be 
//butoon component i want to return the name for array from the array  and on click on the buton the counter will inrement 

export default Voting
