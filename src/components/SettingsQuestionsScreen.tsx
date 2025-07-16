"use client";
import React, { useState } from "react";
import MainLayout from "./layout/MainLayout";
import { initialQuestions, Question, Answer } from "@/data/questions";
import { Trash2 } from "lucide-react";
import { useLanguage } from "@/context/languageContext";

export default function SettingsQuestionsScreen() {
  const { t } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const updateWeight = (
    qid: number,
    aid: number,
    weight: number
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === aid ? { ...a, weight } : a
              ),
            }
          : q
      )
    );
  };

  const deleteAnswer = (qid: number, aid: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? { ...q, answers: q.answers.filter((a) => a.id !== aid) }
          : q
      )
    );
  };

  return (
    <MainLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">{t("questions.answers")}</h1>
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-4 rounded shadow space-y-2">
            <h2 className="font-semibold">{q.text}</h2>
            <div className="hidden md:block">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">{t("answer")}</th>
                    <th className="px-2 py-1 text-left">{t("weight")}</th>
                    <th className="px-2 py-1 text-left">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {q.answers.map((a) => (
                    <tr key={a.id}>
                      <td className="px-2 py-1">{a.text}</td>
                      <td className="px-2 py-1">
                        <input
                          type="number"
                          value={a.weight}
                          onChange={(e) =>
                            updateWeight(q.id, a.id, Number(e.target.value))
                          }
                          className="border p-1 rounded w-20"
                        />
                      </td>
                      <td className="px-2 py-1">
                        <button
                          onClick={() => deleteAnswer(q.id, a.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-2 md:hidden">
              {q.answers.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <span>{a.text}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={a.weight}
                      onChange={(e) =>
                        updateWeight(q.id, a.id, Number(e.target.value))
                      }
                      className="border p-1 rounded w-20"
                    />
                    <button
                      onClick={() => deleteAnswer(q.id, a.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
