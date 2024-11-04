import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, CardHeader, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";

const initialValues = {
  ad: '',
  soyad: '',
  email: '',
  password: '',
};

const errorMessages = {
  ad: 'Adınızı en az üç karakter giriniz',
  soyad: 'Soyadınızı en az üç karakter giriniz',
  email: 'Geçerli bir email giriniz',
  password: 'En az 8 karakter, en az 1 büyük harf, en az 1 küçük harf ve sembol içermelidir',
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [id,setId] = useState("");
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === "ad" || name === "soyad") {
      if (value.trim().length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    axios.post("https://reqres.in/api/users",formData)
    .then((response)=>{
      setId(response.data.id)
    })
    console.log("Form başarıyla gönderildi:", formData);
    setFormData(initialValues)
  };

  useEffect(() => {
    if (
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password)
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  return (
    <>
      <Card>
        <CardHeader>Kayıt Ol</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">Ad</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınızı Giriniz"
                type="text"
                onChange={handleChange}
                value={formData.ad}
                invalid={errors.ad}
              />
              {errors.ad && <FormFeedback>{errorMessages.ad}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="soyad">Soyad</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyadınızı Giriniz"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={errors.soyad}
              />
              {errors.soyad && <FormFeedback>{errorMessages.soyad}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Kurumsal e-mail adresinizi giriniz"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email}
              />
              {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Güçlü bir password seçiniz"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password}
              />
              {errors.password && <FormFeedback>{errorMessages.password}</FormFeedback>}
            </FormGroup>
            <Button disabled={!isValid}>Kayıt Ol</Button>
          </Form>
        </CardBody>
        <CardFooter>
          ID:{id}
        </CardFooter>
      </Card>
    </>
  );
}
