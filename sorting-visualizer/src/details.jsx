// import bubble_c from "../src/AlgoCode/bubble.c"

export const details = {
  QuickSort: {
    name: "Quick Sort",
    description: (
      <>
        <p>
          Quick Sort is a sorting algorithm based on splitting the data
          structure into smaller partitions and sorting them recursively until
          the data structure is sorted.
        </p>
        <p>
          This division in partitions is done based on an element, called pivot:
          all the elements bigger than the pivot go on the right, the smaller
          ones to the left.
        </p>
        <p>
          This partition technique based on the pivot is called{" "}
          <a
            href="https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm"
            target="_blank"
          >
            Divide and conquer
          </a>
          . It's also used by{" "}
          <a href="/mergesort" target="_blank">
            Merge Sort
          </a>
          .
        </p>
      </>
    ),
    complexity: {
      avg: "O(n × log n)",
      best: "O(n × log n)",
      worst: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      space: "O(log n)",
    },
    implementation: {
      c: `void swap(int* a, int* b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,

      cpp: `void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,

      js: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    
    for (let element of arr) {
        if (element < pivot) left.push(element);
        else if (element > pivot) right.push(element);
        else equal.push(element);
    }
    
    return [...quickSort(left), ...equal, ...quickSort(right)];
}`,

      py: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)`,
    },
  },

  MergeSort: {
    name: "Merge Sort",
    description: (
      <>
        <p>
          Merge Sort is a sorting algorithm based on the Divide and Conquer
          technique, like <a href="/quicksort">Quick Sort</a>. It can be
          implemented iteratively or recursively, using the Top-Down and
          Bottom-Up algorithms respectively.
        </p>
        <p>
          The algorithm divides the data structure recursively until the
          subsequences contain only one element. At this point, the subsequences
          get merged and ordered sequentially. To do so, the algorithm
          progressively builds the sorted sublist by adding each time the
          minimum element of the next two unsorted subsequences until there is
          only one sublist remaining.
        </p>
        <p>
          This algorithm is stable and guarantees O(n log n) time complexity in
          all cases, making it more predictable than Quick Sort.
        </p>
      </>
    ),
    complexity: {
      avg: "O(n × log n)",
      best: "O(n × log n)",
      worst: "O(n × log n)",
      space: "O(n)",
    },
    implementation: {
      c: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> L(arr.begin() + l, arr.begin() + m + 1);
    vector<int> R(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      js: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
      py: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    },
  },

  HeapSort: {
    name: "Heap Sort",
    description: (
      <>
        <p>
          Heap Sort is an in-place iterative sorting algorithm based on
          auxiliary data structures called heap. It's less efficient than
          algorithms with the same time complexity and it's not suitable for
          data structures with few elements.
        </p>
        <p>
          The heap is a data structure representable as a binary tree, where
          each node has a value bigger or equal to its children. Consequently,
          the root will hold the maximum value.
        </p>
        <p>
          The data structure gets ordered to form the heap initially, and then
          it gets progressively reordered with an algorithm similar to{" "}
          <a href="/selectionsort">Selection Sort</a>, starting from the bigger
          elements.
        </p>
      </>
    ),
    complexity: {
      avg: "O(n × log n)",
      best: "O(n × log n)",
      worst: "O(n × log n)",
      space: "O(1)",
    },
    implementation: {
      c: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      cpp: `void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      js: `function heapify(arr, n, i) {
    let largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    let n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}`,
      py: `def heapify(arr, n, i):
    largest = i
    l, r = 2 * i + 1, 2 * i + 2
    if l < n and arr[l] > arr[largest]:
        largest = l
    if r < n and arr[r] > arr[largest]:
        largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr`,
    },
  },

  BubbleSort: {
    name: "Bubble Sort",
    description: (
      <>
        <p>
          Bubble Sort is an iterative sorting algorithm that imitates the
          movement of bubbles in sparkling water. The bubbles represent the
          elements of the data structure.
        </p>
        <p>
          The bigger bubbles reach the top faster than smaller bubbles, and this
          algorithm works in the same way. It iterates through the data
          structure and for each cycle compares the current element with the
          next one, swapping them if they are in the wrong order.
        </p>
        <p>
          It's a simple algorithm to implement, but not very efficient: on
          average, quadratic sorting algorithms with the same time complexity
          such as <a href="/selectionsort">Selection Sort</a> or{" "}
          <a href="/insertionsort">Insertion Sort</a> perform better.
          <br />
          It has several variants to improve its performance, such as{" "}
          <a href="/shakersort">Shaker Sort</a>,{" "}
          <a href="/oddevensort">Odd Even Sort</a> and{" "}
          <a href="/combsort">Comb Sort</a>.
        </p>
      </>
    ),
    complexity: {
      avg: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      best: "O(n)",
      worst: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      space: "O(1)",
    },
    implementation: {
      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
      js: `function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
      py: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    },
  },

  SelectionSort: {
    name: "Selection Sort",
    description: (
      <>
        <p>
          Selection Sort is an iterative and in-place sorting algorithm that
          divides the data structure in two sublists: the ordered one, and the
          unordered one. The algorithm loops for all the elements of the data
          structure and for every cycle picks the smallest element of the
          unordered sublist and adds it to the sorted sublist, progressively
          filling it.
        </p>
        <p>
          It's a really simple and intuitive algorithm that does not require
          additional memory, but it's not really efficient on big data
          structures due to its quadratic time complexity.
        </p>
        <p>
          This algorithm has been upgraded and enhanced in several variants such
          as <a href="/heapsort">Heap Sort</a>.
        </p>
      </>
    ),
    complexity: {
      avg: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      best: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      worst: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      space: "O(1)",
    },
    implementation: {
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
      js: `function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min_idx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
    return arr;
}`,
      py: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
    },
  },

  InsertionSort: {
    name: "Insertion Sort",
    description: (
      <>
        <p>
          Insertion sort is a simple sorting algorithm that builds the final
          sorted array one item at a time. It's less performant than advanced
          sorting algorithms, but it can still have some advantages: it's really
          easy to implement and it's efficient on small data structures almost
          sorted.
        </p>
        <p>
          The algorithm divides the data structure in two sublists: a sorted
          one, and one still to sort. Initially, the sorted sublist is made up
          of just one element and it gets progressively filled. For every
          iteration, the algorithm picks an element on the unsorted sublist and
          inserts it at the right place in the sorted sublist.
        </p>
        <p>
          It's available in several variants such as{" "}
          <a href="/gnomesort">Gnome Sort</a>.
        </p>
      </>
    ),
    complexity: {
      avg: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      best: "O(n)",
      worst: (
        <>
          O(n<sup>2</sup>)
        </>
      ),
      space: "O(1)",
    },
    implementation: {
      c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      js: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
      py: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    },
  },
};
