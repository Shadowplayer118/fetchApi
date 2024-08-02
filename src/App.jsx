import { useState, useEffect } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';

const Clients = () => {
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);

    const makeAddModalAppear = () => setShowAddModal(!showAddModal);

    const [clientName, setClientName] = useState("");

    const getClients = async () => {
        const response = await fetch(
            "http://localhost:5184/api/ClientApi/GetClients"
        );
        const result = await response.json()
        setClient(result)
        setLoading(false);
    }

    const saveClient = async () => {
        const dataToSend = {
            "clientName": clientName,
            "residency": "quite place"
        }

        const response = await fetch(
            "http://localhost:5184/api/ClientApi/saveclient",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            }
        );
        getClients();
        makeAddModalAppear();

    }

    const DeleteClient = async (id) => {

        const response = await fetch(
            "http://localhost:5184/api/ClientApi/deleteclient?Id="+id,
            {
                method: "DELETE",
            }
        );
        getClients();
        

    }


    useEffect(() => {
        getClients();
    }, []);

    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
                <Modal.Header closeButton>
                    new client info
                </Modal.Header>
                <Modal.Body>
                    <input type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveClient}>Save client</Button>
                </Modal.Footer>
            </Modal>


            <div className="container mt-5">
                <Button
                    className='mb-2'
                    onClick={makeAddModalAppear}
                >Add new Client</Button>
                <ul>
                    {
                        client.map((c) =>
                            <li key={c.id} >{c.clientName} || {c.residency}
                            <Button onClick={()=>DeleteClient(c.id)}>Delete</Button>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    );
}

export default Clients;