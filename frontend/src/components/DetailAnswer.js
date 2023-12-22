import "quill/dist/quill.snow.css";
import { useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import useAnswerStore from "../zustand/answerStore";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Modal, Form, Spinner } from "react-bootstrap";

const DetailAnswer = ({ answer, id, state }) => {
  const { likeAnswer, dislikeAnswer } = useAnswerStore();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    jenis_laporan: "",
    deskripsi: "",
    bukti_laporan: "",
    answer_id: answer.id,
    pelapor_id: user.data.user_id,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(process.env.REACT_APP_API_HOST + "/api/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.data.token}`,
      },
      body: JSON.stringify({
        ...form,
      }),
    });
    setTimeout(() => {
      setLoading(false);
      handleClose();
    }, 500);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex gap-3  p-3">
            <div className="d-flex flex-column gap-4">
              <img
                className="hidden-mb"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  answer.User.Profile.profile_picture === null
                    ? "https://atmos.ucla.edu/wp-content/themes/aos-child-theme/images/generic-avatar.png"
                    : `${process.env.REACT_APP_API_HOST}/` +
                      answer.User.Profile.profile_picture
                }
                alt=""
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <AiFillCaretUp
                  className="mb-3"
                  style={{
                    cursor: "pointer",
                  }}
                  size={30}
                  onClick={() => likeAnswer(answer.id, id, state)}
                />
                <h4>{answer.like_count ? answer.like_count : 0}</h4>
                <AiFillCaretDown
                  style={{
                    cursor: "pointer",
                  }}
                  size={30}
                  onClick={() => dislikeAnswer(answer.id, id, state)}
                />
              </div>
            </div>
            <div
              className="w-100"
              style={{
                overflowX: "auto",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2">
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {answer.User.name}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    {" "}
                    {new Date(answer.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",

                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                      hour12: false,
                    })}
                  </div>
                </div>
                <div>
                  <button
                    style={{
                      border: "none",
                      backgroundColor: "white",
                    }}
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={handleShow}
                  >
                    <BsExclamationCircleFill
                      style={{
                        cursor: "pointer",
                      }}
                      size={20}
                      color={"#000000"}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-4 text-start">
                {/* <p className="text-start">{parse(answer.body)}</p> */}
                <div
                  className="text-start"
                  dangerouslySetInnerHTML={{ __html: answer.body }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            Form Pelaporan
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Jenis Pelanggaran</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setForm((prevstate) => {
                    return { ...prevstate, jenis_laporan: e.target.value };
                  })
                }
              >
                <option>Pilih Jenis Pelanggaran</option>
                <option value="bersifat sara">Bersifat Sara</option>
                <option value="bersifat pornografi">Bersifat Pornografi</option>
                <option value="bersifat spam">Bersifat Spam</option>
                <option value="bersifat politik">Bersifat Politik</option>
                <option value="bersifat provokatif">Bersifat Provokatif</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) =>
                  setForm((prevstate) => {
                    return { ...prevstate, deskripsi: e.target.value };
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bukti</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Laporkan"
              )}
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default DetailAnswer;
