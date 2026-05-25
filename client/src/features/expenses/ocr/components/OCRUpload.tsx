// // "use client";

// // import { ImageIcon, Upload, X } from "lucide-react";
// // import React, { useRef, useState } from "react";

// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/src/components/ui/dialog";

// // import { Button } from "@/src/components/ui/button";

// // type OCRUploadProps = {
// //   open: boolean;
// //   onClose: () => void;
// //   onUpload?: (base64: string, file: File) => void;
// // };

// // export const OCRUpload: React.FC<OCRUploadProps> = ({
// //   open,
// //   onClose,
// //   onUpload,
// // }) => {
// //   const inputRef = useRef<HTMLInputElement | null>(null);

// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [base64, setBase64] = useState<string | null>(null);
// //   const [dragging, setDragging] = useState(false);

// //   const convertToBase64 = (file: File) => {
// //     const reader = new FileReader();

// //     reader.onloadend = () => {
// //       const result = reader.result as string;

// //       setPreview(result);
// //       setBase64(result);

// //       onUpload?.(result, file);
// //     };

// //     reader.readAsDataURL(file);
// //   };

// //   const handleFile = (file: File) => {
// //     convertToBase64(file);
// //   };

// //   const removeImage = () => {
// //     setPreview(null);
// //     setBase64(null);

// //     if (inputRef.current) {
// //       inputRef.current.value = "";
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-xl bg-[#00271e] text-[#00b24b] rounded-3xl border-0 p-6">
// //         <DialogHeader>
// //           <DialogTitle className="text-xl font-semibold">
// //             Upload Bill / Receipt
// //           </DialogTitle>
// //         </DialogHeader>

// //         <div className="mt-4">
// //           {!preview && (
// //             <div
// //               onDragOver={(e) => {
// //                 e.preventDefault();
// //                 setDragging(true);
// //               }}
// //               onDragLeave={() => setDragging(false)}
// //               onDrop={(e) => {
// //                 e.preventDefault();
// //                 setDragging(false);

// //                 const file = e.dataTransfer.files?.[0];

// //                 if (file) {
// //                   handleFile(file);
// //                 }
// //               }}
// //               onClick={() => inputRef.current?.click()}
// //               className={`
// //                 flex min-h-[280px] cursor-pointer flex-col items-center
// //                 justify-center rounded-3xl border-2 border-dashed
// //                 transition-all duration-200
// //                 ${
// //                   dragging
// //                     ? "border-blue-500 bg-[#005340]"
// //                     : "border-slate-300 bg-[#005340] hover:bg-[#003a2c]"
// //                 }
// //               `}
// //             >
// //               <div className="flex flex-col items-center gap-4">
// //                 <div className="rounded-2xl bg-blue-100 p-4">
// //                   <ImageIcon className="h-10 w-10" />
// //                 </div>

// //                 <div className="space-y-1 text-center">
// //                   <p className="text-lg font-semibold">
// //                     Drop your image here, or browse
// //                   </p>

// //                   <p className="text-sm text-gray-300">
// //                     Supports JPG, JPEG, PNG
// //                   </p>
// //                 </div>
// //               </div>

// //               <input
// //                 ref={inputRef}
// //                 type="file"
// //                 accept="image/png,image/jpeg,image/jpg"
// //                 className="hidden"
// //                 onChange={(e) => {
// //                   const file = e.target.files?.[0];

// //                   if (file) {
// //                     handleFile(file);
// //                   }
// //                 }}
// //               />
// //             </div>
// //           )}

// //           {preview && (
// //             <div className="space-y-4">
// //               <div className="overflow-hidden rounded-2xl border bg-slate-50">
// //                 <img
// //                   src={preview}
// //                   alt="Receipt preview"
// //                   className="max-h-[450px] w-full object-contain"
// //                 />
// //               </div>

// //               <div className="flex items-center justify-between">
// //                 <Button
// //                   variant="outline"
// //                   onClick={removeImage}
// //                   className="gap-2"
// //                 >
// //                   <X className="h-4 w-4" />
// //                   Remove
// //                 </Button>

// //                 <Button
// //                   onClick={() => {
// //                     console.log(base64);
// //                   }}
// //                   className="gap-2"
// //                 >
// //                   <Upload className="h-4 w-4" />
// //                   Continue
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// "use client";

// import { Button } from "@/src/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/src/components/ui/dialog";
// import { Progress } from "@/src/components/ui/progress";
// import { ImageIcon, Loader2, ScanText, X } from "lucide-react";

// import React, { useEffect, useRef, useState } from "react";
// import { createWorker, Worker } from "tesseract.js";

// type OCRUploadProps = {
//   open: boolean;
//   onClose: () => void;

//   onUpload?: (result: {
//     text: string;
//     base64: string;
//     file: File;
//     confidence: number;
//   }) => void;
// };

// export const OCRUpload: React.FC<OCRUploadProps> = ({
//   open,
//   onClose,
//   onUpload,
// }) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const workerRef = useRef<Worker | null>(null);

//   const [preview, setPreview] = useState<string | null>(null);
//   const [base64, setBase64] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);

//   const [dragging, setDragging] = useState(false);

//   const [ocrText, setOcrText] = useState("");
//   const [loadingOCR, setLoadingOCR] = useState(false);

//   const [progress, setProgress] = useState(0);
//   const [status, setStatus] = useState("idle");

//   useEffect(() => {
//     const initWorker = async () => {
//       const worker = await createWorker("eng", 1, {
//         logger: (m) => {
//           if ("progress" in m) {
//             setProgress(m.progress * 100);
//             setStatus(m.status);
//           }
//         },
//       });

//       workerRef.current = worker;
//     };

//     initWorker();

//     return () => {
//       workerRef.current?.terminate();
//       workerRef.current = null;
//     };
//   }, []);

//   const convertToBase64 = (file: File) => {
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const result = reader.result as string;

//       setPreview(result);
//       setBase64(result);
//       setFile(file);
//     };

//     reader.readAsDataURL(file);
//   };

//   const handleFile = (file: File) => {
//     convertToBase64(file);
//   };

//   const removeImage = () => {
//     setPreview(null);
//     setBase64(null);
//     setFile(null);
//     setOcrText("");
//     setProgress(0);
//     setStatus("idle");

//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   const extractOCR = async () => {
//     if (!workerRef.current || !base64 || !file) return;

//     try {
//       setLoadingOCR(true);
//       setOcrText("");

//       const result = await workerRef.current.recognize(base64);

//       const extractedText = result.data.text;

//       setOcrText(extractedText);

//       onUpload?.({
//         text: extractedText,
//         base64,
//         file,
//         confidence: result.data.confidence,
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoadingOCR(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-3xl rounded-3xl p-6">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-semibold">
//             Upload Bill / Receipt
//           </DialogTitle>
//         </DialogHeader>

//         <div className="mt-4 space-y-5">
//           {!preview && (
//             <div
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setDragging(true);
//               }}
//               onDragLeave={() => setDragging(false)}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 setDragging(false);

//                 const file = e.dataTransfer.files?.[0];

//                 if (file) {
//                   handleFile(file);
//                 }
//               }}
//               onClick={() => inputRef.current?.click()}
//               className={`
//                 flex min-h-[280px] cursor-pointer flex-col items-center
//                 justify-center rounded-3xl border-2 border-dashed
//                 transition-all duration-200
//                 ${
//                   dragging
//                     ? "border-blue-500 bg-blue-50"
//                     : "border-slate-300 bg-slate-50 hover:bg-slate-100"
//                 }
//               `}
//             >
//               <div className="flex flex-col items-center gap-4">
//                 <div className="rounded-2xl bg-blue-100 p-4">
//                   <ImageIcon className="h-10 w-10 text-blue-600" />
//                 </div>

//                 <div className="space-y-1 text-center">
//                   <p className="text-lg font-semibold text-slate-700">
//                     Drop your image here, or browse
//                   </p>

//                   <p className="text-sm text-slate-500">
//                     Supports JPG, JPEG, PNG
//                   </p>
//                 </div>
//               </div>

//               <input
//                 ref={inputRef}
//                 type="file"
//                 accept="image/png,image/jpeg,image/jpg"
//                 className="hidden"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];

//                   if (file) {
//                     handleFile(file);
//                   }
//                 }}
//               />
//             </div>
//           )}

//           {preview && (
//             <div className="space-y-5">
//               <div className="overflow-hidden rounded-2xl border bg-slate-50">
//                 <img
//                   src={preview}
//                   alt="Receipt preview"
//                   className="max-h-[400px] w-full object-contain"
//                 />
//               </div>

//               {(loadingOCR || progress > 0) && (
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <p className="capitalize text-slate-600">{status}</p>

//                     <p className="font-medium text-slate-700">
//                       {Math.round(progress)}%
//                     </p>
//                   </div>

//                   <Progress value={progress} />
//                 </div>
//               )}

//               <div className="flex items-center justify-between">
//                 <Button
//                   variant="outline"
//                   onClick={removeImage}
//                   className="gap-2"
//                 >
//                   <X className="h-4 w-4" />
//                   Remove
//                 </Button>

//                 <Button
//                   onClick={extractOCR}
//                   disabled={loadingOCR}
//                   className="gap-2"
//                 >
//                   {loadingOCR ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <ScanText className="h-4 w-4" />
//                   )}
//                   Extract Text
//                 </Button>
//               </div>

//               {!!ocrText && (
//                 <div className="space-y-2 rounded-2xl border bg-slate-950 p-4">
//                   <p className="text-sm font-semibold text-white">OCR RESULT</p>

//                   <pre className="overflow-auto whitespace-pre-wrap text-sm text-green-400">
//                     {ocrText}
//                   </pre>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };
