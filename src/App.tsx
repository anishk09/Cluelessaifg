import React, { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { ClosetScreen, FashionItem } from "./ClosetScreen";
import { AddItemDialog } from "./AddItemDialog";
import { Button } from "./ui/button";

function App() {
  // Master wardrobe state
  const [wardrobe, setWardrobe] = useState<FashionItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Add a new item to the wardrobe
  const handleAddItem = (item: FashionItem) => {
    setWardrobe((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Wardrobe</h1>
        <Button onClick={() => setDialogOpen(true)}>Add Item</Button>
      </div>

      {/* Closet Screen */}
      <ClosetScreen wardrobe={wardrobe} />

      {/* Add Item Dialog */}
      <AddItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAddItem={handleAddItem}
      />
    </div>
  );
}