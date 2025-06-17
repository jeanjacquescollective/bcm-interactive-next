"use client";   
import React from "react";
import SessionList from "../app/[lang]/modals/SessionList";




const ModalImporter: React.FC = () => {
    return (
        <SessionList
            onClose={() => {}}
            onEdit={() => {}}
            onRemove={() => {}}
            onSelect={() => {}}
            onAdd={() => {}}
        />
    );
};

export default ModalImporter;