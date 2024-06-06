import React, { memo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ReactInputMask from 'react-input-mask';
import useEdit from "./useEdit";
import { FaUserEdit } from "react-icons/fa";

function EditModal({data}) {

  const { handleInputChangeDataLid, setAddData, addLid, addData } = useEdit(data)

  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setModalShow(false);
  const submit = (e) => {
    e.preventDefault();
    addLid();
    setModalShow(false);
  }
  return (
    <div>
      <button type="button" className="deleteLidDetail editDetail" variant="primary" onClick={() => setModalShow(true)}>
        <FaUserEdit /> Profilni tahrirlash
      </button>

      <Modal
        show={modalShow}
        size="xl"
        backdrop="static"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit}>
            <div className="formGroup">
              <Form.Group className="mb-3 inputForm" controlId="formBasicName">
                <Form.Label>Ismini kiriting</Form.Label>
                <Form.Control
                  value={addData.name}
                  onChange={(e) => handleInputChangeDataLid(e, "name")}
                  type="text"
                  placeholder="Ismini kiriting"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 inputForm"
                controlId="formBasicSurname"
              >
                <Form.Label>Familiyasini kiriting</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Familiyasini kiriting"
                  value={addData.surname}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "surname")}
                />
              </Form.Group>
            </div>
            <div className="formGroup">
              <Form.Group className="mb-3 inputForm" controlId="formBasicPhone">
                <Form.Label>Raqamini kiriting</Form.Label>
                <ReactInputMask
                  className="form-control"
                  mask="+\9\9\8 (99) 999-99-99"
                  type="text"
                  placeholder="Raqamini kiriting"
                  value={addData.pNumber}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "pNumber")}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 inputForm"
                controlId="formBasicFphone"
              >
                <Form.Label>Ota-onasini raqamini kiriting</Form.Label>
                <ReactInputMask
                  className="form-control"
                  mask="+\9\9\8 (99) 999-99-99"
                  type="text"
                  placeholder="Ota-Onasini raqamini kiriting"
                  value={addData.parentsNumber}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "parentsNumber")}
                />
              </Form.Group>
            </div>
            <div className="formGroup">
              <Form.Group
                className="mb-3 inputForm"
                controlId="formBasicAddress"
              >
                <Form.Label>Manzilini kiriting</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Manzilini kiriting"
                  value={addData.address}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "address")}
                />
              </Form.Group>
              <Form.Group className="mb-3 inputForm" controlId="formBasicAge">
                <Form.Label>Yoshini kiriting</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Yoshini kiriting"
                  value={addData.born}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "born")}
                />
              </Form.Group>
            </div>
            <div className="formGroup">
              <div className="formGroupSelect">
                <Form.Label>
                  O'quv markaz haqida qayerdan eshitdingiz?
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={addData.about}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "about")}
                >
                  <option>O'quv markaz haqida qayerdan eshitdingiz?</option>
                  <option value="Instagram">Intagram</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Banner">Bannerlar</option>
                  <option value="Tanishlar">Tanishlar</option>
                </Form.Select>
              </div>
              <div className="formGroupSelect">
                <Form.Label>Bo'sh vaqti?</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={addData.free}
                  required
                  onChange={(e) => handleInputChangeDataLid(e, "free")}
                >
                  <option>Bo'sh vaqti?</option>
                  <option value="08:00 - 10:00">08:00 - 10:00</option>
                  <option value="10:00 - 12:00">10:00 - 12:00</option>
                  <option value="08:00 - 12:00">08:00 - 12:00</option>
                  <option value="13:00 - 15:00">13:00 - 15:00</option>
                  <option value="15:00 - 17:00">15:00 - 17:00</option>
                  <option value="13:00 - 17:00">13:00 - 17:00</option>
                </Form.Select>
              </div>
            </div>
            <div className="formGroup mt-3">
              <div className="formGroupSelect">
                <Form.Label>Fan tanlovi</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={addData.sub1}
                  onChange={(e) => handleInputChangeDataLid(e, "sub1")}
                >
                  <option>Fan tanlovi</option>
                  <option value="Dasturlash (FrontEnd)">
                    Dasturlash (FrontEnd)
                  </option>
                  <option value="English Kids (Shahnoza)">
                    English Kids (Shahnoza)
                  </option>
                  <option value="CEFR (Soliha)">CEFR (Soliha)</option>
                  <option value="English Kids (Nilufar)">
                    English Kids (Nilufar)
                  </option>
                  <option value="Kompyuter savodxonligi">
                    Kompyuter savodxonligi
                  </option>
                </Form.Select>
              </div>
              <div className="formGroupSelect">
                <Form.Label>
                  Fan tanlovi (Agar yana bitta fandan o'qimoqchi bo'lsa)
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  required
                  value={addData.sub2}
                  onChange={(e) => handleInputChangeDataLid(e, "sub2")}
                >
                  <option>Fan tanlovi (Ixtiyoriy)</option>
                  <option value="Dasturlash (FrontEnd)">
                    Dasturlash (FrontEnd)
                  </option>
                  <option value="English Kids (Shahnoza)">
                    English Kids (Shahnoza)
                  </option>
                  <option value="CEFR (Soliha)">CEFR (Soliha)</option>
                  <option value="English Kids (Nilufar)">
                    English Kids (Nilufar)
                  </option>
                  <option value="Kompyuter savodxonligi">
                    Kompyuter savodxonligi
                  </option>
                </Form.Select>
              </div>
            </div>
            <Button type="submit" variant="success save">
              Saqlash
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default memo(EditModal);
