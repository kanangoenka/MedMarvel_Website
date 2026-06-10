"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Eye,
  FileText,
  Download,
} from "lucide-react";

type WorklistActionDialogProps = {
  type: "viewer" | "files" | "report";

  files?: string[];

  report?: string | null;
};

export default function WorklistActionDialog({
  type,
  files = [],
  report,
}: WorklistActionDialogProps) {
  const renderTrigger = () => {
    switch (type) {
      case "viewer":
        return (
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Eye size={18} />
          </button>
        );

      case "files":
        return (
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <FileText size={18} />
          </button>
        );

      case "report":
        return (
          <button
            disabled={!report}
            className={`
              p-2 rounded-lg
              ${
                report
                  ? "hover:bg-gray-100"
                  : "opacity-40 cursor-not-allowed"
              }
            `}
          >
            <Download size={18} />
          </button>
        );
    }
  };

  const renderContent = () => {
    switch (type) {
      case "viewer":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                DICOM Viewer
              </DialogTitle>
            </DialogHeader>

            <p className="text-sm text-gray-500">
              Viewer integration coming soon.
            </p>
          </>
        );

      case "files":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                Uploaded Files
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <span>{file}</span>

                  <button
                    className="text-blue-600 text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </>
        );

      case "report":
        return (
          <>
            <DialogHeader>
              <DialogTitle>
                Report
              </DialogTitle>
            </DialogHeader>

            {report ? (
              <div className="flex items-center justify-between border rounded-lg p-3">
                <span>{report}</span>

                <button
                  className="text-blue-600 text-sm font-medium"
                >
                  Open Report
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Report not available.
              </p>
            )}
          </>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        {renderTrigger()}
      </DialogTrigger>

      <DialogContent>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}