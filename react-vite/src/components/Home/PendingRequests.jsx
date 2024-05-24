import "./Home.css"

function PendingRequests({friends, sessionUser, handleClick}) {

  const findApprovalForRequestsSent = (friend) => {
    const req = friend.requests.find(req => req.current_user === friend.id && req.inviting_user === sessionUser.id)
    return req.approved
  }

  return (
    <div className="pending-requests-container">
      <h2>Pending Friend Requests</h2>
      {friends.length > 0 && friends?.map(friend => (
        <div key={friend.id} className="friend-card">
          {
            findApprovalForRequestsSent(friend) === 0 &&
            <>
              <h2>{friend?.username}</h2>
              <h3>Pending...</h3>
              <button onClick={(e) => handleClick(e, friend.id)}>Cancel Request</button>
            </>
          }  
        </div>    
      ))}
    </div>
  )
}

export default PendingRequests