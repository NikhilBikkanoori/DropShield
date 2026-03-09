import sys, json, os
MODEL_JSON = os.path.join(os.path.dirname(__file__), "model.json")

# ---------------------------------------------
# Fallback simple rules (same as your original)
# ---------------------------------------------
def heuristic(features):
    attendance, due, marks = features
    if attendance < 70 or marks < 50 or due > 5000:
        return {"risk": "high", "score": 0.9}
    if attendance < 80 or marks < 60 or due > 2000:
        return {"risk": "medium", "score": 0.6}
    return {"risk": "low", "score": 0.1}

# ---------------------------------------------
# Predict from one decision tree in JSON format
# ---------------------------------------------
def predict_tree(tree, features):
    # Leaf node
    if "label" in tree:
        return tree["label"]

    feat = tree["feature"]
    thresh = tree["threshold"]

    if features[feat] < thresh:
        return predict_tree(tree["left"], features)
    else:
        return predict_tree(tree["right"], features)

# ---------------------------------------------
# Main program
# ---------------------------------------------
data = json.load(sys.stdin)
features = data.get("features", [])

try:
    if os.path.exists(MODEL_JSON):
        with open(MODEL_JSON, "r") as f:
            model = json.load(f)

        trees = model.get("trees", [])
        if not trees:
            raise ValueError("No trees in model file")

        # Collect predictions from all trees
        votes = []
        for tree in trees:
            pred = predict_tree(tree, features)
            votes.append(pred)

        # Voting
        from collections import Counter
        final = Counter(votes).most_common(1)[0][0]

        # Score = proportion of trees voting for the chosen label
        score = Counter(votes)[final] / len(votes)

        out = {"risk": final, "score": score}
    else:
        out = heuristic(features)

except Exception:
    out = heuristic(features)

json.dump(out, sys.stdout)
