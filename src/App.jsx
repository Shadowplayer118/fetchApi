import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Clients = () => {
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddModal, setShowAddModal] = useState(false);
    const makeAddModalAppear = () => setShowAddModal(!showAddModal);

    const [showUpdateModal, setShowUpdateModal] = useState(true);
    const makeUpdateModalAppear = () => setShowUpdateModal(!showUpdateModal);

    const [clientName, setClientName] = useState("");

    const [residency, setResidency] = useState("");

    const [selectedClientId, setSelectedClientId] = useState(0);
    const [selectedClient, setSelectedClient] = useState({
                                                        id: 0,
                                                        clientName : "",
                                                        residency : ""
                                                    })

    const getClients = async () => {
        const response = await fetch(
            "http://localhost:5034/api/ClientApi/GetClients"
        );
        const result = await response.json()
        setClient(result)
        setLoading(false);
    }

    const getClient = async (id) => {
        console.log(id);
        const response = await fetch(
            "http://localhost:5034/api/ClientApi/GetClient?id="+id,
        );
       
        const result = await response.json()
        console.log(result)
        setSelectedClient(result)
        makeUpdateModalAppear();
    }

    const saveClient = async () => {
        const dataToSend = {
            "client_name": clientName,
            "residency": residency
        }


        const response = await fetch(
            "http://localhost:5034/api/ClientApi/SaveClient",
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



    const updateClient = async () => {
       
        const response = await fetch(
            "http://localhost:5034/api/ClientApi/UpdateClient?Id="+selectedClientId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedClient)
            }
        );

        getClients();
        makeUpdateModalAppear();
    }

    const DeleteClient = async (id) => {

        const response = await fetch(
            "http://localhost:5034/api/ClientApi/deleteclient?Id="+id,
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
                    <label htmlFor="clientName">Client Name</label>
                    <input type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />

                    <label htmlFor="clientName">Residency</label>
                    <input type="text"
                        value={residency}
                        onChange={(e) => setResidency(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveClient}>Save client</Button>
                </Modal.Footer>
            </Modal>



            <Modal show={showUpdateModal} onHide={makeUpdateModalAppear}>
                <Modal.Header closeButton>
                    update client info
                </Modal.Header>
                
                <Modal.Body>
                    <input type="text"
                        value={selectedClient.client_name}
                        onChange={(e) => 
                            setSelectedClient((c)=> 
                                ({...c, clientName : e.target.value}))
                        }
                    />

                    <input type="text"
                        value={selectedClient.residency}
                        onChange={(e) => 
                            setSelectedClient((c)=> 
                                ({...c, clientName : e.target.value}))
                        }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={updateClient}>Update client</Button>
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
                            <li key={c.id} >{c.client_name} || {c.residency}
                            <Button className='btn-warning' 
                                onClick={()=> {
                                    getClient(c.id);
                                    setSelectedClientId(c.id);
                                }}
                            >Update</Button>
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