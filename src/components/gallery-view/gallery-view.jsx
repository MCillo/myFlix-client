import React from "react";
import { MyFlixUrl } from "../../utils/url";
import { useState } from "react";

import { Button, Col, Row, Container, Image, Form } from "react-bootstrap";

import { ImageList, ImageListItem } from "@mui/material";
// import { response } from "express";

export const GalleryView = ({ gallery, addImage }) => {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const response = await fetch(`${MyFlixUrl}/upload`, {
                method: "POST",
                body: FormData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Image Uploaded Successfully:", data.message);
            } else {
                console.error("Error Uploading Image:", response.statusText);
            }

        } catch (error) {
            console.error("Error Uploading Image:", error.message);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col>
                    <h1>Upload an Image to the Gallery</h1>
                    <Form onSubmit={handleUpload}>
                        <label>Choose Image</label>
                        <input type="file" onChange={handleChange} />

                        <Button type="submit">Upload Image</Button>
                    </Form>
                </Col>
            </Row>
            <div>
                {gallery.map((imageName) => {
                    return <Image 
                        src={`http://localhost:8080/view-image/${imageName}`} rounded />;
                })}
            </div>
        </Container>
    )
}
export default GalleryView;