// WARNING: DO NOT TOUCH THESE UNLESS YOU REALLY KNOW WHAT YOU ARE TRULY DOING!!
const FMLAS = {
    // This module's so obvious, stable and trivial that no testing's needed
    chars: difficulty => DIFFICULTIES[difficulty].chars,
    l: difficulty => FMLAS.chars(difficulty).length,
    size: l => Math.sqrt(l),
    portionGroupIndex: (portionIndex, size) => Math.floor(portionIndex / size),
    portionIndexInGroup: (portionIndex, size) => portionIndex % size
    //
}; // FMLAS
