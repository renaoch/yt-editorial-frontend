"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../../hooks/use-outside-click";
import { assignEditor } from "../../lib/api/User"; // update the path if needed

export function ExpandableCardDemo({ cards }) {
  const [active, setActive] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [pendingAssign, setPendingAssign] = useState(null);

  const ref = useRef(null);
  const id = useId();

  const handleAssignEditor = async (editorId) => {
    setPendingAssign(editorId);
    const result = await assignEditor(editorId);

    if (result?.success) {
      // You can update UI here if needed, like marking this card as assigned
      console.log("Assigned successfully:", result.relation);
    } else {
      console.warn("Assignment failed");
    }
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden bg-white rounded-full h-6 w-6 flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1681426472026-60d4bf7b69a1?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={active.name}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex gap-3 items-center mb-2">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={active.avatar}
                        alt=""
                      />
                      <motion.h3
                        layoutId={`title-${active.name}-${id}`}
                        className="font-bold text-neutral-700 dark:text-neutral-200"
                      >
                        {active.name}
                      </motion.h3>
                    </div>
                    <motion.p className="text-neutral-400">
                      {active.email}
                    </motion.p>
                    <motion.p
                      className={`text-neutral-600 mt-2 pr-2 ${
                        !showMore
                          ? "max-h-[100px] overflow-hidden [mask-image:linear-gradient(to_bottom,white,white,transparent)]"
                          : ""
                      }`}
                    >
                      {active.description || "No description available."}
                    </motion.p>

                    {active.description?.length > 100 && (
                      <motion.button
                        className="mt-2 text-sm text-blue-500"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show Less" : "Read More"}
                      </motion.button>
                    )}
                  </div>

                  {active.assigned ? (
                    <motion.button
                      layoutId={`button-${active.name}-${id}`}
                      className="px-4 py-3 text-sm rounded-full font-bold bg-gray-400 text-white self-end cursor-not-allowed"
                      disabled
                    >
                      Assigned!
                    </motion.button>
                  ) : (
                    <motion.button
                      layoutId={`button-${active.name}-${id}`}
                      className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white self-end"
                      onClick={() => handleAssignEditor(active._id)}
                      disabled={pendingAssign === active._id}
                    >
                      {pendingAssign === active._id ? "Pending..." : "Assign"}
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.name}-${id}`}
            key={card._id}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${card.name}-${id}`}>
                <img
                  src={card.avatar}
                  alt={card.name}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${card.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`email-${card.email}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {card.email}
                </motion.p>
              </div>
            </div>
            {!card.assigned && (
              <motion.button
                layoutId={`button-${card.name}-${id}`}
                className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
              >
                View
              </motion.button>
            )}
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);
