"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  doctors: {
    id: string;
    name: string;
  }[];

  onCreate: (data: any) => void;
};

export default function CreateCaseModal({
  doctors,
  onCreate,
}: Props) {
  const [patientId, setPatientId] =
    useState("");

  const [patientName, setPatientName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [doctorId, setDoctorId] =
    useState("");

  const [doctorName, setDoctorName] =
    useState("");

  const [studyDescription, setStudyDescription] =
    useState("");

  const [modality, setModality] =
    useState("");

  // Imaging Files

  const [mriFiles, setMriFiles] =
    useState<File[]>([]);

  const [petFiles, setPetFiles] =
    useState<File[]>([]);

  const [dwiFiles, setDwiFiles] =
    useState<File[]>([]);

  const [otherFiles, setOtherFiles] =
    useState<File[]>([]);

  const [folderFiles, setFolderFiles] =
    useState<File[]>([]);

  // Documents

  const [medicalHistory, setMedicalHistory] =
    useState<File[]>([]);

  const [consentForm, setConsentForm] =
    useState<File[]>([]);

  const [patientInfo, setPatientInfo] =
    useState<File[]>([]);

  const [otherDocuments, setOtherDocuments] =
    useState<File[]>([]);

  function handleSubmit() {
    if (
      !patientId ||
      !patientName ||
      !doctorId ||
      !modality
    ) {
      alert(
        "Please fill all mandatory fields."
      );
      return;
    }

    onCreate({
      id: crypto.randomUUID(),

      patientId,
      patientName,
      age,
      gender,

      doctorId,
      doctorName,

      studyDescription,
      modality,

      mriFiles,
      petFiles,
      dwiFiles,
      otherFiles,
      folderFiles,

      medicalHistory,
      consentForm,
      patientInfo,
      otherDocuments,

      reportUploaded: false,
      reportUrl: null,

      status: "UPLOADED",

      createdAt:
        new Date().toISOString(),
    });

    setPatientId("");
    setPatientName("");
    setAge("");
    setGender("");
    setDoctorId("");
    setDoctorName("");
    setStudyDescription("");
    setModality("");

    setMriFiles([]);
    setPetFiles([]);
    setDwiFiles([]);
    setOtherFiles([]);
    setFolderFiles([]);

    setMedicalHistory([]);
    setConsentForm([]);
    setPatientInfo([]);
    setOtherDocuments([]);
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-2" />
            Add Case
          </Button>
        }
      />

      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#071739]">
            Add New Case
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">

          {/* PATIENT DETAILS */}

          <div>
            <h3 className="font-semibold text-[#071739] mb-4">
              Patient Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) =>
                  setPatientId(
                    e.target.value
                  )
                }
              />

              <Input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) =>
                  setPatientName(
                    e.target.value
                  )
                }
              />

              <Input
                placeholder="Age"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              />

              <Select
                value={gender}
                onValueChange={(v: any) =>
                  setGender(v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Male">
                    Male
                  </SelectItem>

                  <SelectItem value="Female">
                    Female
                  </SelectItem>

                  <SelectItem value="Other">
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* STUDY DETAILS */}

          <div>
            <h3 className="font-semibold text-[#071739] mb-4">
              Study Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <Select
                value={doctorId}
                onValueChange={(value: any) => {
                  setDoctorId(value);

                  const doctor =
                    doctors.find(
                      (d) =>
                        d.id === value
                    );

                  setDoctorName(
                    doctor?.name || ""
                  );
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>

                <SelectContent>
                  {doctors.map(
                    (doctor) => (
                      <SelectItem
                        key={
                          doctor.id
                        }
                        value={
                          doctor.id
                        }
                      >
                        {doctor.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>

              <Select
                value={modality}
                onValueChange={(v: any) =>
                  setModality(v)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Modality" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="MRI">
                    MRI
                  </SelectItem>

                  <SelectItem value="PET">
                    PET
                  </SelectItem>

                  <SelectItem value="DWI">
                    DWI
                  </SelectItem>

                  <SelectItem value="OTHER">
                    OTHER
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="md:col-span-2">
                <Input
                  placeholder="Study Description"
                  value={
                    studyDescription
                  }
                  onChange={(e) =>
                    setStudyDescription(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* IMAGING FILES */}

          <div>
            <h3 className="font-semibold text-[#071739] mb-4">
              Imaging Uploads
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="border rounded-xl p-4">
                <p className="font-medium mb-2">
                  MRI Files
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setMriFiles(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-medium mb-2">
                  PET Files
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setPetFiles(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-medium mb-2">
                  DWI Files
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setDwiFiles(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-medium mb-2">
                  Other Files
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setOtherFiles(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

            </div>

            <div className="mt-4 border rounded-xl p-4">
              <p className="font-medium mb-2">
                Upload Folder
              </p>

              <input
                type="file"
                multiple
                //@ts-ignore
                webkitdirectory=""
                onChange={(e) =>
                  setFolderFiles(
                    Array.from(
                      e.target
                        .files || []
                    )
                  )
                }
              />
            </div>
          </div>

          {/* DOCUMENTS */}

          <div>
            <h3 className="font-semibold text-[#071739] mb-4">
              Documents
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="border rounded-xl p-4">
                <p className="mb-2">
                  Medical History
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setMedicalHistory(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="mb-2">
                  Consent Form
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setConsentForm(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="mb-2">
                  Patient Information
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setPatientInfo(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4">
                <p className="mb-2">
                  Other Documents
                </p>

                <Input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setOtherDocuments(
                      Array.from(
                        e.target
                          .files || []
                      )
                    )
                  }
                />
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              className="bg-[#071739] hover:bg-[#0b2559]"
            >
              Submit Case
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
